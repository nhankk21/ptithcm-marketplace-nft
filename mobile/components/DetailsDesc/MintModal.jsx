import ErrorMessage from '@components/common/ErrorMessage';
import ImagePicker from '@components/common/ImagePicker';
import { OutlineInput } from '@components/common/Input';
import Modal from '@components/common/Modal';
import RenderPickedImage from '@components/common/RenderPickedImage';
import { MintForm } from '@constants/form';
import { UploadImageType } from '@constants/index';
import { MintSchema } from '@constants/schemas';
import { SIZES } from '@constants/theme';
import usePickImage from '@hooks/usePickImage';
import useUserInfo from '@hooks/useUserInfo';
import { nftAPI } from '@services/api';
import { uploadImage } from '@services/firebase';
import { getAllNFTCache } from '@services/queryKeys';
import { Status } from '@services/status';
import { getKeys, initValues } from '@utils/form/helper';
import { useFormik } from 'formik';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { useMutation, useQueryClient } from 'react-query';

const MintModal = ({
  onClose,
  initialData,
  image: _image,
  collectionAddress,
}) => {
  const queryClient = useQueryClient();
  const { address } = useUserInfo();
  const { isLoading, mutate } = useMutation({
    mutationFn: nftAPI.create,
    onSuccess: ({ data } = {}) => {
      if (data.status === Status.OK) {
        queryClient.setQueryData(getAllNFTCache(), (oldData) => {
          return [...oldData, { ...data.data }];
        });
      }
    },
  });
  const { image, handlePickImage } = usePickImage({ initialImage: _image });
  const [loadingUpload, setLoadingUpload] = useState(false);
  const { isValid, touched, errors, values, handleChange, handleBlur } =
    useFormik({
      initialValues: initialData ?? initValues(MintForm),
      validationSchema: MintSchema,
      validateOnMount: true,
    });

  const handleUpload = async (name) => {
    try {
      setLoadingUpload(true);
      const imageUrl = await uploadImage({
        uri: image.uri,
        address: address ?? '0x123', // 0x123 for test
        name,
        type: UploadImageType.NFT,
      });

      return imageUrl;
    } catch (error) {
      throw new Error('Server is error, please try late!');
    }
  };

  const handleCreate = async () => {
    try {
      if (!isValid || !image) {
        return;
      }
      setLoadingUpload(true);
      const imageUrl = await handleUpload(values.name);
      const payload = {
        creator: address,
        collection: collectionAddress,
        url: imageUrl,
        ...values,
      };
      mutate(payload, {
        onSuccess: ({ data } = {}) => {
          if (data.status === Status.OK) {
            Toast.show({
              type: 'success',
              text1: 'Mint NFT',
              text2: data.message,
            });
          } else {
            Toast.show({
              type: 'error',
              text1: 'Mint NFT',
              text2: data.message,
            });
          }
        },
      });
    } catch (error) {
      Toast.show({
        text1: 'Mint NFT',
        text2: error.message,
      });
    } finally {
      setLoadingUpload(false);
    }
  };

  return (
    <Modal>
      <Modal.Title title="Mint" />
      <ScrollView
        style={{ maxHeight: 400 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ marginBottom: SIZES.medium }}>
          {image && (
            <RenderPickedImage uri={image.uri} onPick={handlePickImage} />
          )}
          {!image && <ImagePicker onPick={handlePickImage} />}
        </View>
        <View
          style={{
            gap: SIZES.medium,
          }}
        >
          {getKeys(MintForm).map((fieldName) => {
            const formField = {
              ...MintForm[fieldName],
              text: MintForm[fieldName].title,
            };
            return (
              <View key={fieldName}>
                <OutlineInput
                  {...formField}
                  keyboardType={formField.type}
                  onChangeText={handleChange(fieldName)}
                  onBlur={handleBlur(fieldName)}
                  value={values[fieldName]}
                />
                {touched[fieldName] && errors[fieldName] && (
                  <ErrorMessage errorMsg={errors[fieldName]} />
                )}
              </View>
            );
          })}
        </View>
      </ScrollView>
      <Modal.Actions
        isLoading={loadingUpload || isLoading}
        onNegative={onClose}
        onPositive={handleCreate}
        positiveText="Save"
      />
    </Modal>
  );
};

export default MintModal;

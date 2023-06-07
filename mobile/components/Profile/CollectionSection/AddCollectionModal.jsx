import ErrorMessage from '@components/common/ErrorMessage';
import ImagePicker from '@components/common/ImagePicker';
import { OutlineInput } from '@components/common/Input';
import Modal from '@components/common/Modal';
import RenderPickedImage from '@components/common/RenderPickedImage';
import { CollectionForm } from '@constants/form';
import { UploadImageType } from '@constants/index';
import { CollectionSchema } from '@constants/schemas';
import { SIZES } from '@constants/index';
import useUserInfo from '@hooks/useUserInfo';
import { uploadImage } from '@services/firebase';
import { initValues, getKeys } from '@utils/form/helper';
import * as ImagePickerLib from 'expo-image-picker';
import { useFormik } from 'formik';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { useMutation, useQueryClient } from 'react-query';
import { collectionAPI } from '@services/api';
import { Status } from '@services/status';
import { useRef } from 'react';
import { allCollectionCache, getAllCollectionKey } from '@services/queryKeys';

const AddCollectionModal = ({
  title = 'New collection',
  onClose,
  initialData,
  thumbnail,
  collectionAddress,
  setCollection,
}) => {
  const queryClient = useQueryClient();
  const { address } = useUserInfo();
  const [image, setImage] = useState(thumbnail);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const { dirty, isValid, touched, errors, values, handleChange, handleBlur } =
    useFormik({
      initialValues: initialData ?? initValues(CollectionForm),
      validationSchema: CollectionSchema,
    });

  const isEdit = !!initialData;
  const isPickImageUpdateRef = useRef(false);

  const isDirty = dirty || (isEdit && isPickImageUpdateRef.current);

  const { isLoading, mutate } = useMutation({
    mutationFn: isEdit ? collectionAPI.update : collectionAPI.create,
  });

  // TODO: check late
  const setNewQueryData = (newData, isNew = true) => {
    if (isNew) {
      queryClient.setQueryData(allCollectionCache(), (oldData) => [
        ...oldData,
        newData,
      ]);
    } else {
      queryClient.setQueryData(allCollectionCache(), (oldData) => {
        const idx = oldData.findIndex(
          ({ address }) => address === collectionAddress
        );

        let newList = [...oldData];
        if (idx !== -1) {
          const newItem = { ...newList[idx], ...newData };
          newList[idx] = newItem;
        }

        return newList;
      });
    }
  };

  const handlePickImage = async () => {
    const result = await ImagePickerLib.launchImageLibraryAsync({
      mediaTypes: ImagePickerLib.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
    });
    if (isEdit) {
      isPickImageUpdateRef.current = true;
    }
    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const handleUpload = async (name) => {
    try {
      setLoadingUpload(true);
      const imageUrl = await uploadImage({
        uri: image.uri,
        address: address ?? '0x123', // 0x123 for test
        name,
        type: UploadImageType.Collection,
      });

      return imageUrl;
    } catch (error) {
      throw new Error('Server is error, please try late!');
    }
  };

  const handleUpdate = async () => {
    if (!image || !isValid) {
      return;
    }
    try {
      let imageUrl = image.uri;
      if (
        (isEdit && isPickImageUpdateRef.current) ||
        (!isEdit && !isPickImageUpdateRef.current)
      ) {
        imageUrl = await handleUpload(values.title);
      }
      const payload = {
        creator: address,
        thumbnail: imageUrl,
        collectionAddress,
        ...values,
      };
      mutate(payload, {
        onSuccess: ({ data } = {}) => {
          console.log(data);
          if (data.status === Status.OK) {
            Toast.show({
              type: 'success',
              text1: 'Update collection',
              text2: data.message,
            });
            setCollection((prev) => ({ ...prev, ...payload }));
            setNewQueryData(payload, false);
          } else {
            Toast.show({
              type: 'error',
              text1: 'Update collection',
              text2: data.message,
            });
          }
        },
        onError: (error) => {
          console.log(error);
          Toast.show({ type: 'error', text2: 'Server is error!' });
        },
      });
    } catch (error) {
      console.log(error);
      Toast.show({
        text1: 'Update collection failed',
        text2: error.message,
      });
    } finally {
      setLoadingUpload(false);
    }
  };

  const handleCreate = async () => {
    if (!image || !isValid) {
      return;
    }
    try {
      const imageUrl = await handleUpload(values.title);
      const payload = {
        creator: address,
        thumbnail: imageUrl,
        ...values,
      };
      mutate(payload, {
        onSuccess: ({ data } = {}) => {
          if (data.status === Status.OK) {
            Toast.show({
              type: 'success',
              text1: 'Create collection',
              text2: data.message,
            });

            setNewQueryData(payload);
          } else {
            Toast.show({
              type: 'error',
              text1: 'Create collection',
              text2: data.message,
            });
          }
        },
        onError: (error) => {
          Toast.show({ type: 'error', text2: 'Server is error!' });
        },
      });
    } catch (error) {
      Toast.show({
        text1: 'Creating collection failed',
        text2: error.message,
      });
    } finally {
      setLoadingUpload(false);
    }
  };

  return (
    <Modal>
      <Modal.Title title={title} />
      <ScrollView
        style={{ maxHeight: 400 }}
        showsVerticalScrollIndicator={false}
      >
        <View>
          {image && (
            <RenderPickedImage uri={image.uri} onPick={handlePickImage} />
          )}
          {!image && <ImagePicker onPick={handlePickImage} />}
        </View>
        <View
          style={{
            marginTop: SIZES.base,
            gap: SIZES.medium,
          }}
        >
          {getKeys(CollectionForm).map((fieldName) => {
            let formField = CollectionForm[fieldName];
            formField = { ...formField, text: formField.title };
            return (
              <View key={fieldName}>
                <OutlineInput
                  placeholder="Enter collection name"
                  onChangeText={handleChange(fieldName)}
                  onBlur={handleBlur(fieldName)}
                  value={values[fieldName] + ''}
                  {...formField}
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
        isDisable={!isDirty}
        positiveText="Save"
        onNegative={onClose}
        onPositive={isEdit ? handleUpdate : handleCreate}
      />
    </Modal>
  );
};

export default AddCollectionModal;

import { Formik } from 'formik';
import { View } from 'react-native';
import { Toast } from 'react-native-toast-message';
import { useMutation } from 'react-query';

import Authen from './index';
import { RectButton } from '@components/common/Button';
import { COLORS, SIZES } from '@constants/theme';
import ErrorMessage from '@components/common/ErrorMessage';
import { RegisterSchema } from '@constants/schemas';
import { authenticationAPI } from '@services/api';
import { commonErrorHandler } from '@services/error';
import withModal from '@hoc/withModal';
import InformationRegisterModal from './components/InformationRegisterModal';
import { BlurInput } from '@components/common/Input';
import { RegisterForm } from '@constants/form';
import { getKeys, initValues } from '@utils/form/helper';
import { Status } from '@services/status';

const Register = withModal(({ setModal }) => {
  const { isLoading, mutate } = useMutation({
    mutationFn: authenticationAPI.register,
  });

  const submitHandler = async (values) => {
    mutate(
      getKeys(RegisterForm).reduce(
        (acc, key) => ({ ...acc, [key]: values[key] }),
        {}
      ),
      {
        onError: ({ message, response }) => {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2:
              message ?? commonErrorHandler({ errorCode: response?.status }),
          });
        },
        onSuccess: ({ data: { data } }) => {
          if (data.status !== Status.Failed) {
            setModal({
              isOpen: true,
              Type: InformationRegisterModal,
              metadata: { address: data.address, privateKey: data.private_key },
            });
          } else {
            throw new Error(data.message);
          }
        },
      }
    );
  };

  return (
    <Authen>
      <Formik
        initialValues={initValues(RegisterForm)}
        validationSchema={RegisterSchema}
        onSubmit={submitHandler}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          gap: SIZES.medium,
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={{ gap: SIZES.medium }}>
            {Object.keys(RegisterForm).map((key) => {
              const { type, ...formEntry } = RegisterForm[key];
              return (
                <View key={key}>
                  <BlurInput
                    {...formEntry}
                    blurColor={COLORS.primary}
                    placeholderTextColor={COLORS.gray}
                    secureTextEntry={type === 'password'}
                    onChangeText={handleChange(key)}
                    onBlur={handleBlur(key)}
                    value={values[key]}
                  />
                  {touched[key] && errors[key] && (
                    <ErrorMessage errorMsg={errors[key]} />
                  )}
                </View>
              );
            })}
            <RectButton
              isLoading={isLoading}
              disabled={isLoading}
              text="OK"
              width="100%"
              marginTop={32}
              handlePress={handleSubmit}
            />
          </View>
        )}
      </Formik>
    </Authen>
  );
});

export default Register;

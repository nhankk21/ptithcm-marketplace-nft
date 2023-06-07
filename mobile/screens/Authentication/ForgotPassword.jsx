import { View } from 'react-native';
import { SIZES, COLORS } from '@constants';
import Authen from './index';
import { BlurInput } from '@components/common/Input';
import { RectButton } from '@components/common/Button';
import ErrorMessage from '@components/common/ErrorMessage';
import { Formik } from 'formik';
import { ForgotPasswordSchema } from '@constants/schemas';
import { useMutation } from 'react-query';
import { authenticationAPI } from '@services/api';
import { commonErrorHandler } from '@services/error';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { ResponseMessage } from '@constants/messages';
import { ForgotPasswordForm } from '@constants/form';
import { getKeys, initValues } from '@utils/form/helper';
import { Status } from '@services/status';

const ForgotPassword = (props) => {
  const { isLoading, mutate } = useMutation({
    mutationFn: authenticationAPI.forgotPassword,
  });

  const submitHandler = (values) => {
    mutate(
      getKeys(ForgotPasswordForm).reduce(
        (acc, key) => ({ ...acc, [key]: values[key] }),
        {}
      ),
      {
        onSuccess: ({ data }) => {
          if (data.status !== Status.Failed) {
            Toast.show({
              type: 'success',
              text1: ResponseMessage.success.ResetPassword,
            });
          } else {
            throw new Error(data.message);
          }
        },
        onError: ({ message, response }) => {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2:
              message ?? commonErrorHandler({ errorCode: response?.status }),
          });
        },
      }
    );
  };

  return (
    <Authen {...props}>
      <Formik
        initialValues={initValues(ForgotPasswordForm)}
        onSubmit={submitHandler}
        validationSchema={ForgotPasswordSchema}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          transform: [{ translateY: -100 }],
        }}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          touched,
          errors,
          values,
        }) => (
          <View>
            <View style={{ gap: SIZES.medium }}>
              {Object.keys(ForgotPasswordForm).map((key) => (
                <View key={key}>
                  <BlurInput
                    {...ForgotPasswordForm[key]}
                    secureTextEntry={
                      ForgotPasswordForm[key].type === 'password'
                    }
                    blurColor={COLORS.primary}
                    placeholderTextColor={COLORS.gray}
                    onChangeText={handleChange(key)}
                    onBlur={handleBlur(key)}
                    value={values[key]}
                  />
                  {touched[key] && errors[key] && (
                    <ErrorMessage errorMsg={errors[key]} />
                  )}
                </View>
              ))}
            </View>
            <RectButton
              text="OK"
              width="100%"
              marginTop={32}
              handlePress={handleSubmit}
              isLoading={isLoading}
              disabled={isLoading}
            />
          </View>
        )}
      </Formik>
    </Authen>
  );
};

export default ForgotPassword;

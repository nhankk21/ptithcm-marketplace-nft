import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { RectButton } from '@components';
import ErrorMessage from '@components/common/ErrorMessage';
import { BlurInput } from '@components/common/Input';
import { COLORS, SIZES, ScreenName } from '@constants';
import { LoginForm as LoginFormOrigin } from '@constants/form';
import { LoginSchema } from '@constants/schemas';
import { FONTS } from '@constants/theme';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { authenticationAPI } from '@services/api';
import { commonErrorHandler } from '@services/error';
import { loginKey } from '@services/queryKeys';
import { Status } from '@services/status';
import { getKeys, initValues } from '@utils/form/helper';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { useMutation, useQueryClient } from 'react-query';
import Authen from './index';

const Login = (props) => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();

  const [address, setAddress] = useState();
  const { setItem, getItem } = useAsyncStorage('login');

  const LoginForm = { ...LoginFormOrigin };

  if (address) {
    delete LoginForm.address;
  }

  const { isLoading, mutate } = useMutation({
    mutationFn: authenticationAPI.login,
    onSuccess({ data }) {
      if (data.status !== Status.Failed) {
        queryClient.setQueryData(loginKey(), { ...data.data });
      }
    },
  });

  useEffect(() => {
    (async () => {
      try {
        const address = await getItem();
        if (address) {
          setAddress(address);
        }
      } catch {
        Toast.show({
          type: 'error',
          text1: 'Get address from storage failed!',
        });
      }
    })();
  }, []);

  const submitHandler = (values) => {
    const dataSubmit = {
      address,
      ...getKeys(LoginForm).reduce(
        (acc, key) => ({ ...acc, [key]: values[key] }),
        {}
      ),
    };
    mutate(dataSubmit, {
      onSuccess: ({ data }) => {
        if (data.status !== Status.Failed) {
          navigation.replace(ScreenName.Home);
        } else {
          throw new Error(data.message);
        }
      },
      onError: ({ message, response }) => {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: message ?? commonErrorHandler({ errorCode: response?.status }),
        });
      },
    });
    !address &&
      setItem(values[getKeys(LoginForm)[0]]).catch((e) => {
        Toast.show({
          type: 'error',
          text1: 'Save address to storage failed!',
        });
      });
  };

  return (
    <Authen {...props}>
      <Formik
        // just for test
        initialValues={{ ...initValues(LoginForm), password: 'Thuan12312' }}
        // initialValues={initValues(LoginForm)}
        validationSchema={LoginSchema(!address)}
        onSubmit={submitHandler}
      >
        {({
          handleChange,
          handleSubmit,
          handleBlur,
          values,
          errors,
          touched,
        }) => (
          <>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                gap: SIZES.medium,
              }}
            >
              {address && (
                <TouchableOpacity onPress={() => setAddress(null)}>
                  <Text
                    style={{
                      width: 320,
                      fontFamily: FONTS.medium,
                      marginBottom: SIZES.base,
                      color: COLORS.white,
                      textDecorationLine: 'underline',
                      backgroundColor: COLORS.primary,
                      borderRadius: SIZES.base,
                      paddingHorizontal: SIZES.font,
                      paddingVertical: SIZES.base,
                    }}
                    numberOfLines={1}
                  >
                    {address}
                  </Text>
                </TouchableOpacity>
              )}
              {getKeys(LoginForm).map((key) => (
                <View key={key}>
                  <BlurInput
                    {...LoginForm[key]}
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
              <RectButton
                isLoading={isLoading}
                disabled={isLoading}
                text="Ok"
                width="100%"
                marginTop={12}
                handlePress={handleSubmit}
              />
            </View>
          </>
        )}
      </Formik>
    </Authen>
  );
};

export default Login;

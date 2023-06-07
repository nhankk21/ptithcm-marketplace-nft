import { useState } from 'react';
import { View, Text } from 'react-native';

import { CircleButton } from '@components/common/Button';
import ErrorMessage from '@components/common/ErrorMessage';
import { OutlineInput } from '@components/common/Input';
import Modal from '@components/common/Modal';
import Select from '@components/common/Select';
import { COLORS, CURRENCY, SIZES, assets } from '@constants';
import { ChangePasswordForm, TransferForm } from '@constants/form';
import {
  ChangePasswordSchema,
  exchangeFormSchemaFactory,
  transferFormSchemaFactory,
} from '@constants/schemas';
import useUserInfo from '@hooks/useUserInfo';
import { Picker } from '@react-native-picker/picker';
import { nftAPI, profileAPI } from '@services/api';
import { commonErrorHandler } from '@services/error';
import { loginKey } from '@services/queryKeys';
import { Status } from '@services/status';
import { getKeys, initValues } from '@utils/form/helper';
import { useFormik } from 'formik';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useExchange } from '../useActionsSection';
import { FONTS } from '@constants/theme';

const TypeTransfer = [
  { value: 'Token', label: 'GOR' },
  { value: 'Fiat', label: 'USD' },
];

const ExchangeIcon = assets.exchange;

export const TransferModal = ({ onClose, setData, tokenBalance, address }) => {
  const queryClient = useQueryClient();
  const { isLoading, mutate } = useMutation({
    mutationFn: profileAPI.transfer,
  });

  const [type, setType] = useState(TypeTransfer[0]);
  const { isValid, touched, values, handleChange, handleBlur, errors } =
    useFormik({
      initialValues: initValues(TransferForm),
      validationSchema: transferFormSchemaFactory(tokenBalance),
    });

  const handleTransfer = () => {
    if (!isValid) return;
    const payload = {
      from: address,
      to: values.address,
      type,
      amount: +values.amount,
    };
    mutate(payload, {
      onSuccess: ({ data }) => {
        if (data.status === Status.OK) {
          Toast.show({
            type: 'success',
            text1: 'Transfer',
            text2: data.message,
          });
          queryClient.setQueryData(loginKey(), (oldData) => {
            const data = { ...oldData };
            if (type.value === 'Token') {
              data.token_balance -= +values.amount;
            } else if (type.value === 'Fiat') {
              data.fiat_balance -= +values.amount;
            }
            setData({ ...data });
            return { ...data };
          });
        } else {
          Toast.show({
            type: 'error',
            text1: 'Transfer',
            text2: data.message,
          });
        }
      },
      onError: ({ message, response }) => {
        Toast.show({
          type: 'error',
          text1: 'Transfer',
          text2: message ?? commonErrorHandler({ errorCode: response?.status }),
        });
      },
    });
  };

  return (
    <Modal onClose={onClose}>
      <Modal.Title title="Transfer" />
      <Select
        title="Type"
        options={TypeTransfer}
        onChange={setType}
        value={type}
      />
      {getKeys(TransferForm).map((key) => {
        const formValue = TransferForm[key];
        return (
          <View key={key}>
            <OutlineInput
              text={formValue.title}
              secureTextEntry={formValue.type === 'password'}
              keyboardType={formValue.type}
              placeholder={formValue.placeholder}
              value={values[key]}
              onChangeText={handleChange(key)}
              onBlur={handleBlur(key)}
            />
            {touched[key] && errors[key] && (
              <ErrorMessage errorMsg={errors[key]} />
            )}
          </View>
        );
      })}
      <Modal.Actions
        onNegative={onClose}
        isLoading={isLoading}
        onPositive={handleTransfer}
        positiveText="Confirm"
      />
    </Modal>
  );
};

export const ChangePasswordModal = ({ onClose }) => {
  const { isValid, touched, values, handleChange, handleBlur, errors } =
    useFormik({
      initialValues: initValues(ChangePasswordForm),
      validationSchema: ChangePasswordSchema,
    });

  const handleUpdatePwd = () => {
    if (!isValid) return;
    console.log('update pwd', values);
    // TODO: call API update
  };

  return (
    <Modal>
      <Modal.Title title="Change Password" />
      {getKeys(ChangePasswordForm).map((key) => {
        const formValue = ChangePasswordForm[key];
        return (
          <View key={key}>
            <OutlineInput
              text={formValue.title}
              secureTextEntry={formValue.type === 'password'}
              placeholder={formValue.placeholder}
              value={values[key]}
              onChangeText={handleChange(key)}
              onBlur={handleBlur(key)}
            />
            {touched[key] && errors[key] && (
              <ErrorMessage errorMsg={errors[key]} />
            )}
          </View>
        );
      })}
      <Modal.Actions onNegative={onClose} onPositive={handleUpdatePwd} />
    </Modal>
  );
};

const ExchangeModalItem = ({
  title,
  inputProps,
  setExchangeIdx,
  exchangeIdx,
}) => {
  return (
    <View>
      <OutlineInput.Label text={title} />
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flex: 3 }}>
          <OutlineInput
            placeholder="Enter amount"
            keyboardType="numeric"
            {...inputProps}
          />
        </View>
        <Picker
          style={{
            flex: 2,
            marginRight: -SIZES.medium,
          }}
          selectedValue={CURRENCY[exchangeIdx].value}
          onValueChange={(_, index) => setExchangeIdx(index)}
        >
          {CURRENCY.map((currency) => (
            <Picker.Item
              key={currency.value}
              value={currency.value}
              label={currency.label}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
};

export const ExchangeModal = ({ onClose, setData }) => {
  const queryClient = useQueryClient();
  const { fiatBalance, tokenBalance } = useUserInfo();
  const { data: ratePriceData } = useQuery({ queryFn: nftAPI.getPrice });
  const ratePrice = ratePriceData?.data?.data;

  const {
    exchange: { exchangeIdx, receiveIdx },
    setExchangeIdx,
    setReceiveIdx,
    setExchange,
  } = useExchange(CURRENCY.length, { exchangeIdx: 0, receiveIdx: 1 });

  const currencyType = CURRENCY[exchangeIdx].value;
  const isFiat = currencyType === 'Fiat';
  const balanceObject = isFiat
    ? {
        sendBalance: fiatBalance,
        getBalance: tokenBalance,
      }
    : {
        sendBalance: tokenBalance,
        getBalance: fiatBalance,
      };
  const validationSchema = exchangeFormSchemaFactory(balanceObject);

  const { isValid, errors, values, touched, setValues, handleBlur, resetForm } =
    useFormik({
      initialValues: {
        youSend: '',
        youGet: '',
      },
      validationSchema,
    });
  const { address } = useUserInfo();

  const { mutate } = useMutation({
    mutationFn: profileAPI.exchange,
  });

  const handleRevertExchange = () => {
    setExchange({ exchangeIdx: receiveIdx, receiveIdx: exchangeIdx });
    resetForm({});
  };

  console.log(values);

  const handleExchange = () => {
    if (!isValid) return;
    const payload = {
      address,
      amount: +values.youSend,
      exchange_to: CURRENCY[receiveIdx].value,
    };

    mutate(payload, {
      onSuccess: ({ data } = {}) => {
        console.log(data);
        if (data.status === Status.OK) {
          Toast.show({
            type: 'success',
            text1: data.message,
          });
          queryClient.setQueryData(loginKey(), (oldData) => {
            const newData = { ...oldData };
            if (payload.exchange_to === 'Fiat') {
              newData.fiat_balance += payload.amount;
              newData.token_balance -= payload.amount;
            } else {
              newData.fiat_balance -= payload.amount;
              newData.token_balance += payload.amount;
            }

            setData({ ...newData });
            return { ...newData };
          });
        } else {
          Toast.show({
            type: 'error',
            text1: data.message,
          });
        }
      },
    });
  };

  const handleSetExchangeIdx = (index) => {
    setExchangeIdx(index);
    resetForm();
  };

  const handleSetReceiveIdx = (index) => {
    setReceiveIdx(index);
    resetForm();
  };

  const handleChangeYouSend = (value) => {
    if (CURRENCY[exchangeIdx].value === 'Fiat') {
      setValues({ youGet: +value / ratePrice, youSend: +value });
    } else {
      setValues({ youGet: +value * ratePrice, youSend: +value });
    }
  };

  return (
    <Modal>
      <Modal.Title title="Exchange" />
      <View>
        <ExchangeModalItem
          title="You send"
          setExchangeIdx={handleSetExchangeIdx}
          exchangeIdx={exchangeIdx}
          inputProps={{
            onChangeText: handleChangeYouSend,
            onBlur: handleBlur('youSend'),
            value: values['youSend'],
          }}
        />
        {touched.youSend && errors.youSend && (
          <ErrorMessage errorMsg={errors.youSend} />
        )}
      </View>
      <View
        style={{
          position: 'relative',
          height: 30,
          alignItems: 'center',
        }}
      >
        <CircleButton
          backgroundColor={COLORS.primary}
          handlePress={handleRevertExchange}
        >
          <ExchangeIcon fill={COLORS.white} />
        </CircleButton>
      </View>
      {!!values.youSend && (
        <View
          style={{
            marginTop: SIZES.medium,
            borderStyle: 'solid',
            borderBottomWidth: 0.5,
            borderColor: COLORS.primary,
            paddingBottom: SIZES.base,
          }}
        >
          <Text style={{ textAlign: 'center', fontFamily: FONTS.bold }}>
            {values.youGet} {CURRENCY[receiveIdx].label}
          </Text>
        </View>
      )}

      <Modal.Actions
        onNegative={onClose}
        onPositive={handleExchange}
        positiveText="Confirm"
      />
    </Modal>
  );
};

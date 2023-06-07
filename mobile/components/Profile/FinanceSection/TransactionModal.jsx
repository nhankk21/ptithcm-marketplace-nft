import { View } from 'react-native';

import { SIZES } from '@constants/theme';
import Modal from '@components/common/Modal';
import { OutlineInput } from '@components/common/Input';
import CURRENCY from '@constants/currency';
import useCurrency from '@hooks/useCurrency';
import { Picker } from '@react-native-picker/picker';
import { useFormik } from 'formik';
import { transactionFormSchemaFactory } from '@constants/schemas';
import ErrorMessage from '@components/common/ErrorMessage';
import useUserInfo from '@hooks/useUserInfo';
import { useMutation, useQueryClient } from 'react-query';
import { profileAPI } from '@services/api';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { Status } from '@services/status';
import { loginKey } from '@services/queryKeys';

const TransactionModal = ({ title, onClose, setData }) => {
  const queryClient = useQueryClient();
  const { fiatBalance, address, jwt } = useUserInfo();

  console.log(jwt);

  const isWithdraw = title === 'Withdraw';

  const validationSchema = isWithdraw
    ? transactionFormSchemaFactory(fiatBalance)
    : null;

  const { isLoading, mutate } = useMutation({
    mutationFn: isWithdraw ? profileAPI.withdraw : profileAPI.deposit,
  });

  const { isValid, handleChange, values, errors } = useFormik({
    initialValues: {
      amount: '',
    },
    validationSchema,
  });

  const handleConfirm = () => {
    if (!isValid) return;
    const payload = { address, amount: +values.amount };
    console.log(payload);
    mutate(payload, {
      onSuccess: ({ data } = {}) => {
        if (data.status === Status.OK) {
          Toast.show({
            type: 'success',
            text2: data.message,
          });
          queryClient.setQueryData(loginKey(), (oldData) => {
            const newData = { ...oldData };
            if (isWithdraw) {
              newData.fiat_balance -= +values.amount;
            } else {
              newData.fiat_balance += +values.amount;
            }

            setData({ ...newData });
            return { ...newData };
          });
        } else {
          Toast.show({
            type: 'error',
            text2: data.message,
          });
        }
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };
  return (
    <Modal>
      <Modal.Title title={title} />
      <View>
        <OutlineInput.Label text={title} />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ flex: 3 }}>
            <OutlineInput
              value={values.amount}
              onChangeText={handleChange('amount')}
              keyboardType="numeric"
              placeholder="Enter amount"
            />
          </View>
        </View>
        {errors.amount && <ErrorMessage errorMsg={errors.amount} />}
      </View>
      <Modal.Actions
        onNegative={onClose}
        onPositive={handleConfirm}
        positiveText="Confirm"
      />
    </Modal>
  );
};

export default TransactionModal;

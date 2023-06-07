import * as yup from 'yup';

/**
 * Max creator earning percent
 */

export const MAX_CREATOR_EARNING = 5;

const Message = {
  Required: 'Required!',
  PositiveValue: 'Value must be a positive value',
  NumberType: 'Value must be a valid number!',
  Min: ({ min }) => `Min length is ${min}!`,
  MinValue: ({ min }) => `Min value is ${min}!`,
  MaxValue: ({ max }) => `Value must less or equal than ${max}`,
};

const isEnoughBalance = (maxValue) =>
  function () {
    if (maxValue === 0) {
      return this.createError({ message: `Your balance do not enough!` });
    }
    return true;
  };

export const LoginSchema = (hasAddress) =>
  yup.object({
    address: hasAddress ? yup.string().required(Message.Required) : '',
    password: yup.string().required(Message.Required).min(8, Message.Min),
  });

export const RegisterSchema = yup.object({
  username: yup.string().required(Message.Required).min(4, Message.Min),
  password: yup.string().required(Message.Required).min(8, Message.Min),
  passwordAgain: yup
    .string()
    .required(Message.Required)
    .oneOf(
      [yup.ref('password')],
      'The password and password again must be match!'
    ),
});

export const ForgotPasswordSchema = yup.object({
  privateKey: yup.string().required(Message.Required),
  newPassword: yup.string().required(Message.Required).min(8, Message.Min),
});

export const UsernameSchema = yup.object({
  username: yup.string().required(Message.Required).min(4, Message.Min),
});

export const ChangePasswordSchema = yup.object({
  oldPwd: yup.string().required(Message.Required).min(8, Message.Min),
  newPwd: yup.string().required(Message.Required).min(8, Message.Min),
  retypePwd: yup
    .string()
    .required(Message.Required)
    .oneOf([yup.ref('newPwd')], 'The retype password must be match!'),
});

export const transferFormSchemaFactory = (balance) =>
  yup.object({
    address: yup.string().required(Message.Required),
    amount: yup
      .number()
      .required(Message.Required)
      .typeError(Message.NumberType)
      .test('balance_is_0', '', isEnoughBalance(balance))
      .min(Math.min(0.001, balance), Message.MinValue)
      .max(balance, Message.MaxValue),
  });

export const exchangeFormSchemaFactory = ({ sendBalance, getBalance }) =>
  yup.object({
    youSend: yup
      .number()
      .required(Message.Required)
      .typeError(Message.NumberType)
      .test('balance_is_0', '', isEnoughBalance(sendBalance))
      .min(Math.min(0.001, sendBalance), Message.MinValue)
      .max(sendBalance, Message.MaxValue),
    youGet: yup.number(),
  });

export const transactionFormSchemaFactory = (balance) =>
  yup.object({
    amount: yup
      .number()
      .required(Message.Required)
      .typeError(Message.NumberType)
      .test('balance_is_0', '', isEnoughBalance(balance))
      .min(Math.min(0.001, balance), Message.MinValue)
      .max(balance, Message.MaxValue),
  });

export const CollectionSchema = yup.object({
  rate: yup
    .number()
    .required(Message.Required)
    .typeError(Message.NumberType)
    .min(0, Message.PositiveValue)
    .max(MAX_CREATOR_EARNING, Message.MaxValue),
  title: yup.string().required(Message.Required).min(8, Message.Min),
  description: yup.string().required(Message.Required).min(8, Message.Min),
});

export const MintSchema = yup.object({
  name: yup.string().required(Message.Required).min(4, Message.Min),
  price: yup
    .number()
    .required(Message.Required)
    .typeError(Message.NumberType)
    .min(0, Message.PositiveValue),
  description: yup.string().required(Message.Required),
});

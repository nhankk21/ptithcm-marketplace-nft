export const RegisterForm = {
  username: {
    title: 'Username',
    placeholder: 'username...',
  },
  password: {
    title: 'Password',
    placeholder: 'password...',
    type: 'password',
  },
  passwordAgain: {
    title: 'Retype password',
    placeholder: 'retype password...',
    type: 'password',
  },
};

export const ForgotPasswordForm = {
  privateKey: {
    title: 'Private key',
    placeholder: 'private key...',
  },
  newPassword: {
    title: 'New password',
    placeholder: 'new password...',
    type: 'password',
  },
};

export const LoginForm = {
  address: {
    title: 'Address',
    placeholder: 'address...',
  },
  password: {
    title: 'Password',
    placeholder: 'password...',
    type: 'password',
  },
};

export const ChangePasswordForm = {
  oldPwd: {
    title: 'Your password',
    placeholder: 'Enter your password',
    type: 'password',
  },
  newPwd: {
    title: 'New password',
    placeholder: 'Enter new password',
    type: 'password',
  },
  retypePwd: {
    title: 'Retype new password',
    placeholder: 'Retype new password',
    type: 'password',
  },
};

export const TransferForm = {
  address: {
    title: 'Address',
    placeholder: "Enter transfer's address",
  },
  amount: {
    title: 'Amount',
    type: 'numeric',
    placeholder: 'Enter amount',
  },
};

export const CollectionForm = {
  rate: {
    title: 'Creator earning (%)',
    placeholder: 'Enter percent of create earning',
  },
  title: {
    title: 'Collection name',
    placeholder: 'Enter collection name',
  },
  description: {
    numberOfLines: 5,
    multiline: true,
    title: 'Description',
    placeholder: 'Enter description',
  },
};

export const MintForm = {
  name: {
    title: 'NFT name',
    placeholder: 'Enter name of NFT',
  },
  price: {
    title: 'NFT price',
    placeholder: 'Enter price of NFT',
    type: 'numeric',
  },
  description: {
    title: 'Description',
    placeholder: 'Enter description of NFT',
    numberOfLines: 3,
  },
};

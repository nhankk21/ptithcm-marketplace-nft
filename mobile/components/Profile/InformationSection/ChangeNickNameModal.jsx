import React from 'react';

import { OutlineInput } from '@components/common/Input';
import Modal from '@components/common/Modal';
import { UsernameSchema } from '@constants/schemas';
import ErrorMessage from '@components/common/ErrorMessage';
import { useFormik } from 'formik';

const ChangeNickNameModal = ({ onClose, onUpdate, username: _username }) => {
  const { isValid, errors, handleChange, values } = useFormik({
    initialValues: {
      username: _username,
    },
    validationSchema: UsernameSchema,
  });

  const handleUpdate = () => {
    if (isValid) {
      onUpdate?.(values);
      // TODO: call API update
      console.log(values);
    }
  };

  return (
    <Modal onClose={onClose}>
      <Modal.Title title="Change nickname" />
      <OutlineInput
        text="New nickname"
        placeholder="Enter new nickname"
        value={values.username}
        onChangeText={handleChange('username')}
      />
      {errors.username && (
        <ErrorMessage errorMsg={errors.username} marginTop={-10} />
      )}
      <Modal.Actions onNegative={onClose} onPositive={handleUpdate} />
    </Modal>
  );
};

export default ChangeNickNameModal;

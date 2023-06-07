import React from 'react';
import Modal from '@components/common/Modal';

const ConfirmModal = ({
  title = 'Are you sure?',
  positiveText = 'OK',
  negativeText = 'Cancel',
  onClose,
  onPositive,
  children,
  isLoading,
  style,
}) => {
  return (
    <Modal style={style}>
      <Modal.Title title={title} />
      {children}
      <Modal.Actions
        isLoading={isLoading}
        positiveText={positiveText}
        negativeText={negativeText}
        onNegative={onClose}
        onPositive={onPositive}
      />
    </Modal>
  );
};

export default ConfirmModal;

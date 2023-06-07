import React from 'react';
import Backdrop from './Backdrop';

const Modal = ({ onClose, children, isForce, ...style }) => {
  return (
    <Backdrop forceClose={isForce} {...style} onPress={onClose}>
      {children}
    </Backdrop>
  );
};

export default Modal;

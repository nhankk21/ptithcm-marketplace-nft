import { useState } from 'react';
import { Modal } from 'react-native';
import Backdrop from '../components/Modal/Backdrop';

const withModal = (WrappedComponent) => {
  return ({ modalProps, backdropProps, ...props }) => {
    const [modal, setModal] = useState({ isOpen: false });
    const onClose = () => setModal({ isOpen: false });
    return (
      <>
        <Modal
          animationType="fade"
          visible={modal.isOpen}
          onRequestClose={onClose}
          transparent
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
          {...modalProps}
        >
          <Backdrop {...backdropProps} />
          {modal.Type && <modal.Type onClose={onClose} {...modal.metadata} />}
        </Modal>
        <WrappedComponent
          {...props}
          isOpen={modal.isOpen}
          setModal={setModal}
        />
      </>
    );
  };
};

export default withModal;

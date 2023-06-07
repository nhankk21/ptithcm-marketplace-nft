import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';

import { RectButton } from '@components/common/Button';
import { COLORS, SHADOWS, SIZES } from '@constants';
import withModal from '@hoc/withModal';
import {
  TransferModal,
  ExchangeModal,
  ChangePasswordModal,
} from './components';

const ACTIONS = [
  { id: 'password', title: 'Password', modal: ChangePasswordModal },
  { id: 'transfer', title: 'Transfer', modal: TransferModal },
  { id: 'exchange', title: 'Exchange', modal: ExchangeModal },
];

const ACTIONS_MODAL = ACTIONS.reduce(
  (actions, action) => ({ ...actions, [action.id]: action.modal }),
  {}
);

const ActionsSection = ({ setModal, ...data }) => {
  const pressHandler = (id) => {
    setModal({ isOpen: true, Type: ACTIONS_MODAL[id], metadata: { ...data } });
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ marginTop: SIZES.extraLarge, flexGrow: 0 }}
    >
      {ACTIONS.map((action) => (
        <RectButton
          key={action.id}
          text={action.title}
          marginHorizontal={SIZES.small}
          backgroundColor={COLORS.white}
          color={COLORS.primary}
          marginVertical={SIZES.small}
          borderRadius={SIZES.small}
          handlePress={pressHandler.bind(null, action.id)}
          {...SHADOWS.dark}
        />
      ))}
    </ScrollView>
  );
};

export default withModal(ActionsSection);

import { View } from 'react-native';
import React from 'react';
import Modal from '@components/common/Modal';
import { OutlineInput } from '@components/common/Input';
import { Picker } from '@react-native-picker/picker';
import CURRENCY from '@constants/currency';
import useCurrency from '@hooks/useCurrency';
import { SIZES } from '@constants/theme';

const ListingModal = ({ onClose, onListing }) => {
  const [currency, setCurrency] = useCurrency();
  return (
    <Modal>
      <Modal.Title title="Listing" />
      <View>
        <OutlineInput.Label text="Price" />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ flex: 3 }}>
            <OutlineInput placeholder="Enter a price" keyboardType="numeric" />
          </View>
          <Picker
            style={{ flex: 2, marginRight: -SIZES.medium }}
            selectedValue={currency}
            onValueChange={(currency) => setCurrency(currency)}
          >
            {CURRENCY.map((c) => (
              <Picker.Item key={c.value} value={c.value} label={c.label} />
            ))}
          </Picker>
        </View>
      </View>
      <Modal.Actions
        positiveText="Listing"
        onNegative={onClose}
        onPositive={onListing}
      />
    </Modal>
  );
};

export default ListingModal;

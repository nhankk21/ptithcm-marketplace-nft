import { Text } from 'react-native';
import React from 'react';
import Accordion from '@components/common/Accordion';
import AccordionTitle from './AccordionTitle';
import { SIZES } from '@constants/theme';

const Description = ({ content }) => {
  return (
    <Accordion
      titleComponent={<AccordionTitle type="description" title="Description" />}
      render={() => <Text>{content}</Text>}
      // Fix the end of ScrollView
      style={{
        marginBottom: 100,
        marginTop: SIZES.font,
      }}
    />
  );
};

export default Description;

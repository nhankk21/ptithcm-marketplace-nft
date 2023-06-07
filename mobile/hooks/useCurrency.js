const { useState } = require('react');
import CURRENCY from '@constants/currency';

const useCurrency = () => {
  const [currency, setCurrency] = useState(CURRENCY[0].value);

  return [currency, setCurrency];
};

export default useCurrency;

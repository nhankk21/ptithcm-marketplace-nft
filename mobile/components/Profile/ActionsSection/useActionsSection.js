import { useState } from 'react';

export const useExchange = (
  len,
  initialValue = { exchangeIdx: 0, receiveIdx: 1 }
) => {
  const [exchange, setExchange] = useState(initialValue);

  const setExchangeIdx = (exIdx) => {
    setExchange({
      exchangeIdx: exIdx,
      receiveIdx: (exIdx + 1) % len,
    });
  };

  const setReceiveIdx = (reIdx) => {
    setExchange({
      exchangeIdx: (reIdx + 1) % len,
      receiveIdx: reIdx,
    });
  };

  return { setExchangeIdx, setReceiveIdx, exchange, setExchange };
};

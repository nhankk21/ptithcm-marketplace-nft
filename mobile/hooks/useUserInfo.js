import { useIsFocused } from '@react-navigation/native';
import { loginKey } from '@services/queryKeys';
import { useState, useEffect } from 'react';
import { QueryObserver, useQueryClient } from 'react-query';

const useUserInfo = () => {
  const queryClient = useQueryClient();
  const queryData = queryClient.getQueryData(loginKey());
  const [data, setData] = useState(queryData);

  return {
    ...data,
    fiatBalance: data.fiat_balance,
    tokenBalance: data.token_balance,
    setData,
  };
};

export default useUserInfo;

import { useState } from 'react';
import useUserInfo from './useUserInfo';

const useIsOwn = ({ listed: _listed, ownerAddress }) => {
  const { address } = useUserInfo();
  const [listed, setListed] = useState(_listed);
  const [isOwn, setIsOwn] = useState(address === ownerAddress);

  const isListed = listed && address === ownerAddress;
  const isCancel = !listed && address === ownerAddress;

  return { isListed, isCancel, isOwn, setListed, setIsOwn };
};

export default useIsOwn;

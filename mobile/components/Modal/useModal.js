import { useState } from 'react';

const useModal = (initial = false) => {
  const [isOpen, setIsOpen] = useState(initial);

  return [isOpen, setIsOpen];
};

export default useModal;

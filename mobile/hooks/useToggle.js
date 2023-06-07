import { useState } from 'react';

const useToggle = (initial) => {
  const [isOpen, setIsOpen] = useState(initial);

  const toggle = () => setIsOpen((isOpen) => !isOpen);
  const close = () => setIsOpen(false);
  const open = () => setIsOpen(true);

  return { toggle, close, open, isOpen };
};

export default useToggle;
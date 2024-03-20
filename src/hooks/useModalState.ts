import { useState } from 'react';

// possible could be optimized with useCallback
export const useModalState = (): [
  boolean,
  () => void,
  () => void,
] => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return [isOpen, openModal, closeModal];
}
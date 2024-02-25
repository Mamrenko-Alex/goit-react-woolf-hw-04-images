import { useState } from 'react';

export const useToggle = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const open = () => setIsModalOpen(true);
  const close = () => setIsModalOpen(false);
  const toggle = () => setIsModalOpen(isModalOpen => !isModalOpen);
  return { isModalOpen, toggle, open, close };
};

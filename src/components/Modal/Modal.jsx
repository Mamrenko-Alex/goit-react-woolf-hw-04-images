import React, { useEffect } from 'react';

export const Modal = ({ toggleModal, imageUrl, description }) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        toggleModal();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [toggleModal]);

  const handleOverlayClick = event => {
    if (event.target === event.currentTarget) {
      toggleModal();
    }
  };

  return (
    <div className="overlay" onClick={handleOverlayClick}>
      <div className="modal">
        <img src={imageUrl} alt={description} />
      </div>
    </div>
  );
};

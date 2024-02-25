import React from 'react';
import { Modal } from '../Modal/Modal';
import styles from './ImageGallery.module.css';
import { useToggle } from '../../my_hooks/useToggle';

export const ImageGalleryItem = ({ URL, largeURL, description, id }) => {
  const { isModalOpen, open, toggle } = useToggle();

  return (
    <>
      <li className={styles.image_gallery_item} onClick={open} id={id}>
        <img
          className={styles.image_gallery_item}
          src={URL}
          alt={description}
        />
      </li>
      {isModalOpen && (
        <Modal
          imageUrl={largeURL}
          toggleModal={toggle}
          description={description}
        />
      )}
    </>
  );
};

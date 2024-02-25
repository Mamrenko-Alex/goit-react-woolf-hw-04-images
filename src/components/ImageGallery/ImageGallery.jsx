import { ImageGalleryItem } from './ImageGalleryItem';
import styles from './ImageGallery.module.css';

export const ImageGallery = ({ images }) => {
  return (
    <>
      <span id="image_gallery_js"></span>
      <ul className={styles.image_gallery}>
        {images.map(({ webformatURL, id, largeImageURL, tags }) => (
          <ImageGalleryItem
            key={id}
            id={id}
            URL={webformatURL}
            largeURL={largeImageURL}
            description={tags}
          />
        ))}
      </ul>
    </>
  );
};

import React, { useState, useEffect } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { getImages } from 'api/api';
import { MyLoader } from './Loader/Loader';
import { LoadMoreButton } from './Buttons/LoadMore';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMore, setIsMore] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      if (!query) {
        return;
      }

      try {
        setIsLoading(true);
        const { hits, totalHits } = await getImages(query, currentPage);

        setImages(prevImages => [
          ...prevImages,
          // Прибираємо дублі з бекенду, щоб key був унікальним для кожного елементу в ul
          ...hits.filter(hit => !prevImages.some(image => image.id === hit.id)),
        ]);
        setIsMore(currentPage < Math.ceil(totalHits / 12));
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [query, currentPage]);

  const handlerSearch = async newQuery => {
    if (newQuery === query) return;

    setQuery(newQuery);
    setImages([]);
    setIsLoading(false);
    setIsMore(false);
    setError(null);
    setCurrentPage(1);
  };

  const handleLoadMore = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  return (
    <>
      <Searchbar onSubmit={handlerSearch} />
      <span id="js_anchor"></span>
      {isLoading && <MyLoader />}
      {images.length > 0 && <ImageGallery images={images} />}
      {isMore && <LoadMoreButton onClick={handleLoadMore} />}
    </>
  );
};

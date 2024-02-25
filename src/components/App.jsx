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
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      if (!query) {
        return;
      }

      try {
        setIsLoading(true);
        const { hits, totalHits } = await getImages(query, currentPage);

        setImages(prevImages => [...prevImages, ...hits]);
        setIsMore(currentPage < Math.ceil(totalHits / 12));
      } catch (error) {
        console.error(error);
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

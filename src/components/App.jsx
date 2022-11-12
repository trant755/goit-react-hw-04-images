import { useState } from 'react';
import { Box } from './Box';
import { Searchbar } from './Searchbar/Searchbar';
import * as API from '../helpers/API';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button';
import { Loader } from './Loader';
import { useEffect } from 'react';
import { ToastCnt } from './ToastContainer';
import { toast } from 'react-toastify';

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [maxPages, setMaxPages] = useState(1);
  const [foundPictures, setFoundPictures] = useState([]);
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    async function imageFetch() {
      try {
        if (query === '') return;
        const newImgs = await API.imageFetch(query, page);

        if (newImgs.hits.length === 0) {
          throw new Error('We have not found similar pictures');
        }

        const maxPages = Math.ceil(newImgs.totalHits / 12);

        setFoundPictures(prevState => [...prevState, ...newImgs.hits]);
        setMaxPages(maxPages);
        setIsLoad(false);
      } catch ({ message }) {
        toast.error(message);

        setIsLoad(false);
      }
    }
    imageFetch();
  }, [page, query]);

  const SubmitImgForm = ({ search }, { resetForm }) => {
    if (query !== search) {
      setQuery(search);
      setPage(1);
      setMaxPages(1);
      setFoundPictures([]);
      setIsLoad(true);
    }
  };

  const HandleLoadMore = () => {
    setPage(prevState => prevState + 1);
    setIsLoad(true);
  };

  return (
    <Box display="grid" gridTemplateColumns="1fr" gridGap="16px" pb="24px">
      <Searchbar onSubmit={SubmitImgForm} />
      <ImageGallery images={foundPictures} />
      {isLoad && <Loader />}
      {page !== maxPages && (
        <Button text={'Load more'} onClick={HandleLoadMore} />
      )}
      <ToastCnt />
    </Box>
  );
};

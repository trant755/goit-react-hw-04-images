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
  const [error, setError] = useState(false);
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
        setError(message);
        setIsLoad(false);
      }
    }
    imageFetch();
  }, [page, query]);

  useEffect(() => {
    if (!error) return;
    toast.error(error);
  }, [error]);

  const SubmitImgForm = ({ search }, { resetForm }) => {
    if (query !== search) {
      setQuery(search);
      setPage(1);
      setMaxPages(1);
      setFoundPictures([]);
      setIsLoad(true);
      setError(false);
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

// export class App extends Component {
//   state = {
//     searchQuery: '',
//     page: 1,
//     maxPages: 1,
//     foundPictures: [],
//     error: false,
//     isLoad: false,
//   };

//   async componentDidUpdate(_, prevState) {
//     if (
//       prevState.searchQuery !== this.state.searchQuery ||
//       prevState.page !== this.state.page
//     ) {
//       try {
//         const newImgs = await API.imageFetch(
//           this.state.searchQuery,
//           this.state.page
//         );

//         const maxPages = Math.ceil(newImgs.totalHits / 12);

//         this.setState(prevState => ({
//           foundPictures: [...prevState.foundPictures, ...newImgs.hits],
//           maxPages: maxPages,
//           isLoad: false,
//         }));
//       } catch (error) {
//         this.setState({ error: true, isLoading: false });
//         console.log(error);
//       }
//     }
//   }

//   SubmitImgForm = ({ search }, { resetForm }) => {
//     this.setState(prevState => {
//       if (prevState.searchQuery !== search) {
//         return {
//           searchQuery: search,
//           page: 1,
//           maxPages: 1,
//           foundPictures: [],
//           isLoad: true,
//         };
//       }
//     });
//   };

//   HandleLoadMore = () =>
//     this.setState(prevState => ({
//       page: prevState.page + 1,
//       isLoad: true,
//     }));

//   render() {
//     const state = this.state;
//     const pictures = state.foundPictures;
//     return (
//       <Box display="grid" gridTemplateColumns="1fr" gridGap="16px" pb="24px">
//         <Searchbar onSubmit={this.SubmitImgForm} />
//         <ImageGallery images={pictures} />
//         {this.state.isLoad && <Loader />}
//         {state.page !== state.maxPages && (
//           <Button text={'Load more'} onClick={this.HandleLoadMore} />
//         )}
//       </Box>
//     );
//   }
// }

import axios from 'axios';

const KEY = '30127977-afd00810882476e7ef9a8a757';
axios.defaults.baseURL = 'https://pixabay.com/api/';

export const imageFetch = async (serch, page) => {
  const response = await axios.get('', {
    params: {
      q: serch,
      page: page,
      key: KEY,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
    },
  });
  return response.data;
};

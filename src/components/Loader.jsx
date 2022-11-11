import { ThreeDots } from 'react-loader-spinner';

export const Loader = () => (
  <ThreeDots
    height="150"
    width="150"
    radius="10"
    color="blue"
    ariaLabel="loading"
    wrapperStyle={{
      justifyContent: 'center',
    }}
  />
);

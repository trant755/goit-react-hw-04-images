import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import * as SC from './ImageGallery.styled';
import PropTypes from 'prop-types';

export const ImageGallery = ({ images }) => (
  <SC.ImageGallery>
    {images.map(img => (
      <ImageGalleryItem
        key={img.id}
        src={img.webformatURL}
        largeSrc={img.largeImageURL}
        alt={img.tags}
      />
    ))}
  </SC.ImageGallery>
);

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object),
};

import { Modal } from 'components/Modal/Modal';
import * as SC from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';
import { useState } from 'react';

export const ImageGalleryItem = ({ src, alt, largeSrc }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const OnImgClick = () => setModalOpen(prevState => !prevState);

  return (
    <SC.ImageGalleryItem>
      <SC.ImageGalleryImage onClick={OnImgClick} src={src} alt={alt} />
      {modalOpen && <Modal src={largeSrc} alt={alt} onClick={OnImgClick} />}
    </SC.ImageGalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  largeSrc: PropTypes.string.isRequired,
};

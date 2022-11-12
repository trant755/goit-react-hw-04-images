import * as SC from './Modal.styled';
import { createPortal } from 'react-dom';

import PropTypes from 'prop-types';
import { useEffect } from 'react';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ src, alt, onClick }) => {
  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClick();
    }
  };

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClick();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClick]);

  return createPortal(
    <SC.Overlay onClick={handleBackdropClick}>
      <SC.Modal>
        <img src={src} alt={alt} />
      </SC.Modal>
    </SC.Overlay>,
    modalRoot
  );
};

Modal.propTypes = {
  onClick: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

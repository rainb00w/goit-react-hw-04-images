import React from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem';
import s from './ImageGallery.module.css';

const ImageGallery = ({ images, onItemClick, onClick }) => {
  const handleOpenModal = e => {
    if (e.target !== e.currentTarget) {
      onClick();
    }
  };

  return (
    <ul className={s.ImageGallery} onClick={handleOpenModal}>
      {images.map(({ id, webformatURL }) => {
        return (
          <ImageGalleryItem
            imageURL={webformatURL}
            key={id}
            imageID={id}
            onItemClick={onItemClick}
          />
        );
      })}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
    })
  ),
  onClick: PropTypes.func.isRequired,
  onItemClick: PropTypes.func.isRequired,
};

export default ImageGallery;

import React from 'react';
import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ imageID, imageURL, onItemClick }) => {
  const modalContent = id => {
    onItemClick(id);
  };

  return (
    <li className={s.ImageGalleryItem}>
      <img
        src={imageURL}
        className={s.ImageGalleryItem_image}
        alt=""
        onClick={() => modalContent(imageID)}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  imageURL: PropTypes.string.isRequired,
  imageID: PropTypes.number.isRequired,
  onItemClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;

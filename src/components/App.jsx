import React, { useState, useEffect } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import axios from 'axios';
import Loader from './Loader';
import { ToastContainer, toast } from 'react-toastify';
import Modal from './Modal';

import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [imagesInfo, setImagesInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [totalImages, setTotalImages] = useState(0);

  const formSubmitHandler = querry => {
    if (querry === searchQuery) {
      return toast.warn(
        'Please, enter different querry or use "Load More" button',
        {
          position: 'top-center',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        }
      );
    }
    setSearchQuery(querry);
    setPage(1);
    setImagesInfo([]);
  };

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }
    Fetch();
    handleScroll();
  }, [searchQuery, page]);

  async function Fetch() {
    const BASE_URL =
      'https://pixabay.com/api/?key=26582400-238f4fc38707f184745ce0218&q';
    const url = `${BASE_URL}=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=12&page=${page}`;

    toggleLoading();
    return axios
      .get(url)
      .then(res => {
        if (!(res.status >= 200 && res.status < 300)) {
          throw Error(res.statusText);
        }
        return res;
      })
      .then(res => {
        setImagesInfo(prevState => [...prevState, ...res.data.hits]);
        setTotalImages(res.data.totalHits);
      })
      .catch(error => setError({ error }))
      .finally(toggleLoading());
  }

  const increasePage = () => {
    setPage(state => state + 1);
  };

  const toggleLoading = () => {
    setLoading(state => !state);
  };

  const toggleModal = () => {
    setShowModal(state => !state);
  };

  const modalContentSet = itemId => {
    // console.log('SURE', itemId);
    const element = imagesInfo.find(({ id }) => id === itemId);
    setModalContent(element.largeImageURL);
  };

  const handleScroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  const buttonRender =
    imagesInfo.length > 0 && imagesInfo.length !== totalImages;

  return (
    <>
      <Searchbar onSubmit={formSubmitHandler} />
      {error && 'Ошибка запроса'}
      {imagesInfo && (
        <ImageGallery
          images={imagesInfo}
          onClick={toggleModal}
          onItemClick={modalContentSet}
        />
      )}
      {loading && <Loader />}
      {buttonRender && <Button loadMoreBTN={increasePage} />}
      <ToastContainer />
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={modalContent} alt="something" />
        </Modal>
      )}
    </>
  );
};

export default App;

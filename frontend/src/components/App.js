import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';

import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login';
import Register from './Register';
import { ProtectedRoute } from './ProtectedRoute';

import { useEffect, useState } from 'react';
import { api } from '../utils/Api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import * as auth from '../utils/auth';

import InfoTooltip from './InfoTooltip';
import success from '../images/success.svg';
import fail from '../images/fail.svg';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [userData, setUserData] = useState({});
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

  const [title, setTitle] = useState('');
  const [linkImage, setLinkImage] = useState('');

  const navigate = useNavigate();

  function checkToken() {
    auth
      .getContent()
      .then((data) => {
        if (!data) {
          return;
        }
        setUserData(data);
        setIsLoggedIn(true);
        navigate('/');
      })

      .catch((err) => {
        setIsLoggedIn(false);
        setUserData({});
        console.error(`WARNING ${err}`);
      });
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setSelectedCard(null);
    setIsInfoTooltipOpen(false);
  }

  function showRegisterSucces() {
    setTitle('Вы успешно зарегистрировались!');
    setLinkImage(success);
  }

  function showRegisterFail() {
    setTitle('Что-то пошло не так! Попробуйте ещё раз.');
    setLinkImage(fail);
  }

  function handleCardDelete(card) {
    api
      .removeCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.error(`WARNING ${err}`);
      });
  }
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.error(`WARNING ${err}`);
      });
  }
  function handleUpdateUser(user) {
    api
      .editProfileData(user)
      .then((res) => {
        setCurrentUser(res.data);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.error(`WARNING ${err}`);
      });
  }

  function handleUpdateAvatar(link) {
    api
      .setUserAvatar(link)
      .then((res) => {
        setCurrentUser(res);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.error(`WARNING ${err}`);
      });
  }
  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([
        api
          .getInitialCards()
          .then((res) => {
            setCards(res);
          })
          .catch((err) => {
            console.error(`WARNING ${err}`);
          }),
        api
          .getProfileData()
          .then((res) => {
            setCurrentUser(res);
          })
          .catch((err) => {
            console.error(`WARNING ${err}`);
          }),
      ]);
    }
  }, [isLoggedIn]);
  function handleAddPlaceSubmit(newCard) {
    api
      .addNewCard(newCard)
      .then((res) => {
        console.log(cards);
        setCards([res, ...cards]);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.error(`WARNING ${err}`);
      });
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <div className="page">
          <Header
            userData={userData}
            setIsLoggedIn={setIsLoggedIn}
            setUserData={setUserData}
          />
          <Routes>
            <Route
              path="/*"
              element={
                <ProtectedRoute
                  element={Main}
                  handleEditProfileClick={handleEditProfileClick}
                  isEditProfilePopupOpen={isEditProfilePopupOpen}
                  handleEditAvatarClick={handleEditAvatarClick}
                  isEditAvatarPopupOpen={isEditAvatarPopupOpen}
                  handleAddPlaceClick={handleAddPlaceClick}
                  isAddPlacePopupOpen={isAddPlacePopupOpen}
                  handleCardClick={handleCardClick}
                  selectedCard={selectedCard}
                  handleCardLike={handleCardLike}
                  setCards={setCards}
                  cards={cards}
                  handleCardDelete={handleCardDelete}
                  isLoggedIn={isLoggedIn}
                />
              }
            />
            <Route
              path="/signup"
              element={
                <Register
                  title="Регистрация"
                  nameButton="Зарегистрироваться"
                  setIsInfoTooltipOpen={setIsInfoTooltipOpen}
                  isInfoTooltipOpen={isInfoTooltipOpen}
                  showRegisterSucces={showRegisterSucces}
                  showRegisterFail={showRegisterFail}
                />
              }
            />
            <Route
              path="/sign-in"
              element={
                <Login
                  title="Вход"
                  nameButton="Войти"
                  handleLogin={setIsLoggedIn}
                  setUserData={setUserData}
                  setIsInfoTooltipOpen={setIsInfoTooltipOpen}
                  isInfoTooltipOpen={isInfoTooltipOpen}
                  showRegisterFail={showRegisterFail}
                />
              }
            />
          </Routes>
          <InfoTooltip
            name="update"
            title={title}
            linkImage={linkImage}
            isOpen={isInfoTooltipOpen}
            onClose={closeAllPopups}
          />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />

          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <Footer />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

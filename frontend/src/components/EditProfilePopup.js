import PopupWithForm from './PopupWithForm';
import { useState, useEffect, useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function EditProfilePopup(props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  // / Подписка на контекст
  const currentUser = useContext(CurrentUserContext);

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [props.isOpen, currentUser]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name={'profile'}
      title={'Редактировать профиль'}
      isOpen={props.isOpen}
      onClose={props.onClose}
      buttonText={'Сохранить'}
      onSubmit={handleSubmit}
    >
      <div>
        <input
          className="popup__input popup__input_type_name"
          type="name"
          name="name"
          id="name"
          minLength={2}
          maxLength={40}
          required
          value={name || ''}
          onChange={handleChangeName}
        />
        <span className="popup__input-error popup__input-error_type_name" />
        <input
          className="popup__input popup__input_type_occupation"
          type="text"
          name="occupation"
          id="text"
          minLength={2}
          maxLength={200}
          required
          value={description || ''}
          onChange={handleChangeDescription}
        />
        <span className="popup__input-error popup__input-error_type_occupation" />
      </div>
    </PopupWithForm>
  );
}
export default EditProfilePopup;

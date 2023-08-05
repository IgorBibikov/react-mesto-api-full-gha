import PopupWithForm from './PopupWithForm';
import { useRef } from 'react';

function EditAvatarPopup(props) {
  const linkRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar(linkRef.current.value);
  }
  return (
    <PopupWithForm
      name={'update'}
      title={'Обновить аватар'}
      isOpen={props.isOpen}
      onClose={props.onClose}
      buttonText={'Сохранить'}
      onSubmit={handleSubmit}
    >
      <div>
        <input
          className="popup__input popup__input_type_update"
          type="url"
          name="update"
          id="place-update"
          placeholder="Ссылка на картинку"
          required
          ref={linkRef}
        />
        <span className="popup__input-error popup__input-error_type_update" />
      </div>
    </PopupWithForm>
  );
}
export default EditAvatarPopup;

import PopupWithForm from './PopupWithForm';
import { useRef } from 'react';

function AddPlacePopup(props) {
  const namePlaceRef = useRef();
  const linkPlaceRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace({
      name: namePlaceRef.current.value,
      link: linkPlaceRef.current.value,
    });
  }
  return (
    <PopupWithForm
      name={'place'}
      title={'Новое место'}
      isOpen={props.isOpen}
      onClose={props.onClose}
      buttonText={'Сохранить'}
      onSubmit={handleSubmit}
    >
      <div>
        <input
          className="popup__input popup__input_type_place-name"
          type="name"
          name="place"
          id="place-name"
          defaultValue=""
          placeholder="Название"
          minLength={2}
          maxLength={30}
          required
          ref={namePlaceRef}
        />
        <span className="popup__input-error popup__input-error_type_place" />
        <input
          className="popup__input popup__input_type_link"
          type="url"
          name="link"
          id="place-link"
          defaultValue=""
          placeholder="Ссылка на картинку"
          required
          ref={linkPlaceRef}
        />
        <span className="popup__input-error popup__input-error_type_link" />
      </div>
    </PopupWithForm>
  );
}
export default AddPlacePopup;

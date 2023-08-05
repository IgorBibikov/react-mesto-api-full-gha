function ImagePopup(props) {
  return (
    <div
      className={` popup popup_type_image ${props.card ? 'popup_opened' : ''} 
      }`}
    >
      <div className="popup__image-container">
        <button
          onClick={props.onClose}
          type="button"
          className="popup__close-button"
        />
        <img
          className="popup__big-foto"
          src={props.card ? props.card.link : ''}
          alt={props.card ? props.card.name : ''}
        />
        <h2 className="popup__image-title">
          {props.card ? props.card.name : ''}
        </h2>
      </div>
    </div>
  );
}
export default ImagePopup;

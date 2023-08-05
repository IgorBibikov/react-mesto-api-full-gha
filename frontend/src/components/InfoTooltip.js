function InfoTooltip(props) {
  return (
    <div
      className={`popup popup_type_${props.name} ${
        props.isOpen ? 'popup_opened' : ''
      } `}
    >
      <div className="popup__container">
        <button
          onClick={props.onClose}
          type="button"
          className="popup__close-button"
        />
        <img className="popup__image" src={props.linkImage} alt={props.title} />
        <h2 className="popup__title popup__title_type_success">
          {props.title}
        </h2>
      </div>
    </div>
  );
}
export default InfoTooltip;

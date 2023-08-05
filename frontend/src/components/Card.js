import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Card(props) {
  const userInfo = useContext(CurrentUserContext);

  const isOwn = props.card.owner === userInfo._id;

  const isLiked = props.card.likes.some((i) => i === userInfo._id);
  const cardLikeButtonClassName = `place__like ${
    isLiked && 'place__like_active'
  }`;

  function handleClick() {
    props.onClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <article className="place">
      {isOwn && (
        <button
          className="place__remove-button"
          type="button"
          onClick={handleDeleteClick}
        />
      )}

      <img
        onClick={handleClick}
        src={props.card.link}
        alt={props.card.name}
        className="place__foto"
      />
      <div className="place__group">
        <h2 className="place__title">{props.card.name}</h2>
        <div>
          <button
            type="button"
            onClick={handleLikeClick}
            className={cardLikeButtonClassName}
          />
          <p className="place__sum-likes">{props.card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}
export default Card;

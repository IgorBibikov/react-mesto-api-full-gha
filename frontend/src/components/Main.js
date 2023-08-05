import { useContext } from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main(props) {
  const userInfo = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div
          onClick={props.handleEditAvatarClick}
          className="profile__avatar-container"
        >
          <img src={userInfo.avatar} alt="Аватар" className="profile__avatar" />
        </div>
        <div className="profile__info">
          <div className="profile__title">
            <h1 className="profile__name">{userInfo.name}</h1>
            <button
              onClick={props.handleEditProfileClick}
              className="profile__edit-button"
              type="button"
            />
          </div>
          <p className="profile__subtitle">{userInfo.about}</p>
        </div>
        <button
          onClick={props.handleAddPlaceClick}
          className="profile__add-button"
          type="button"
        />
      </section>
      <section className="places">
        {props.cards.map((card) => {
          return (
            <Card
              card={card}
              key={card._id}
              onClick={props.handleCardClick}
              onCardLike={props.handleCardLike}
              onCardDelete={props.handleCardDelete}
            />
          );
        })}
      </section>
    </main>
  );
}
export default Main;

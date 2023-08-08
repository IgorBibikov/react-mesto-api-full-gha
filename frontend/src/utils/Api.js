class Api {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
    this._headers = {
      'Content-Type': 'application/json',
    };
  }
  _checkRequestStatus(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }
  getProfileData() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      credentials: 'include',
    }).then((res) => this._checkRequestStatus(res));
  }
  editProfileData(user) {
    return fetch(`${this._baseUrl}/users/me `, {
      headers: this._headers,
      method: 'PATCH',
      credentials: 'include',
      body: JSON.stringify({
        name: user.name,
        about: user.about,
      }),
    }).then((res) => this._checkRequestStatus(res));
  }
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
      credentials: 'include',
    }).then((res) => this._checkRequestStatus(res));
  }
  addNewCard(card) {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify({
        name: card.name,
        link: card.link,
      }),
      credentials: 'include',
    }).then((res) => this._checkRequestStatus(res));
  }

  removeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      headers: this._headers,
      method: 'DELETE',
      credentials: 'include',
    }).then((res) => this._checkRequestStatus(res));
  }

  removeLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      headers: this._headers,
      method: 'DELETE',
      credentials: 'include',
    }).then((res) => this._checkRequestStatus(res));
  }

  addLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      headers: this._headers,
      method: 'PUT',
      credentials: 'include',
    }).then((res) => this._checkRequestStatus(res));
  }

  setUserAvatar(link) {
    return fetch(`${this._baseUrl}/users/me/avatar `, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({
        avatar: link,
      }),
      credentials: 'include',
    }).then((res) => this._checkRequestStatus(res));
  }

  changeLikeCardStatus(cardId, isLiked) {
    return isLiked ? this.addLike(cardId) : this.removeLike(cardId);
  }
}

export const api = new Api('http://localhost:3001');

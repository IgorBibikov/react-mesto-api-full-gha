export const BASE_URL = 'http://localhost:3001';
export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',

    body: JSON.stringify({ password, email }),
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  });
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',

    body: JSON.stringify({ email, password }),
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  });
};
export const signout = () => {
  return fetch(`${BASE_URL}/signout`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  });
};

export const getContent = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  });
};

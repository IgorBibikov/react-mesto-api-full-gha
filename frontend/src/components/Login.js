import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import * as auth from '../utils/auth';

function Login(props) {
  const [formValue, setFormValue] = useState({
    password: '',
    email: '',
  });

  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  }

  function handleLoginSubmit(e) {
    e.preventDefault();

    auth
      .authorize(formValue.email, formValue.password)
      .then((data) => {
        console.log(data);
        props.setUserData({ email: data.data.email });
      })
      .then(() => {
        props.handleLogin(true);
        navigate('/');
      })
      // ???
      .catch((err) => {
        props.showRegisterFail();
        props.setIsInfoTooltipOpen(true);
        console.error(`WARNING ${err}`);
      });
  }
  return (
    <main className="content">
      <section className="login">
        <h2 className="login__title">{props.title}</h2>
        <form
          action="#"
          name="sign-up"
          className="login__form "
          onSubmit={handleLoginSubmit}
        >
          <input
            className="login__input login__input_type_email"
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            required
            onChange={handleChange}
          />
          <input
            className="login__input login__input_type_password"
            type="password"
            name="password"
            id="password"
            placeholder="Пароль"
            required
            onChange={handleChange}
          />
          <button type="submit" className="login__submit-button">
            {props.nameButton}
          </button>
        </form>
      </section>
    </main>
  );
}
export default Login;

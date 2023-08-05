import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as auth from '../utils/auth';

function Register(props) {
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
      .register(formValue.password, formValue.email)
      .then(() => {
        props.showRegisterSucces();
        props.setIsInfoTooltipOpen(true);
      })
      .then(() => {
        navigate('/sign-in');
      })
      .catch((err) => {
        console.error(`WARNING ${err}`);
        props.showRegisterFail();
        props.setIsInfoTooltipOpen(true);
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
          <p className="login__subtitle">
            Уже зарегистрированы?{' '}
            <Link to="/sign-in" className="login__link">
              Войти
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
}
export default Register;

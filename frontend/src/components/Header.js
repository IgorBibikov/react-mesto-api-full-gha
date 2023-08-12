import { Link, useNavigate, useLocation } from 'react-router-dom';
import * as auth from '../utils/auth';

function Header(props) {
  const navigate = useNavigate();
  function signOut() {
    auth
      .signout()
      .then((data) => {
        console.log(data);
        props.setIsLoggedIn(false);
        props.setUserData({ email: '' });
        navigate('/sign-in');
      })
      .catch((err) => {
        console.error(`WARNING ${err}`);
      });
  }
  const location = useLocation();
  return (
    <header className="header">
      <a href="/" className="logo logo_place_header" />
      <nav className="navbar">
        <h1 className="navbar__email">{props.userData.email}</h1>
        {location.pathname !== '/sign-in' && location.pathname !== '/' && (
          <Link to="/sign-in" className="navbar__link">
            Войти
          </Link>
        )}
        {location.pathname !== '/signup' && location.pathname !== '/' && (
          <Link to="/signup" className="navbar__link">
            Регистрация
          </Link>
        )}
        {location.pathname !== '/signup' &&
          location.pathname !== '/sign-in' && (
            <Link onClick={signOut} to="/sign-in" className="navbar__link">
              Выйти
            </Link>
          )}
      </nav>
    </header>
  );
}
export default Header;

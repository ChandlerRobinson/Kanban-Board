import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../utils/auth';

const Navbar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkLogin = () => {
    // TODO: check if the user is logged in
    setIsLoggedIn(AuthService.loggedIn());
  };

  useEffect(() => {
    // TODO: run the login check when the component mounts
    checkLogin();
  }, []);

  const handleLogout = () => {
    // TODO: log the user out
    AuthService.logout();
    setIsLoggedIn(false);
  };

  return (
    <div className="nav">
      <div className="nav-title">
        <Link to="/">Krazy Kanban Board</Link>
      </div>
      <ul>
        {!isLoggedIn ? (
          <li className="nav-item">
            <button type="button">
              <Link to="/login">Login</Link>
            </button>
          </li>
        ) : (
          <li className="nav-item">
            <button type="button" onClick={handleLogout}>
              Logout
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;



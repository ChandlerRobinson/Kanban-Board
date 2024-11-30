import { useState, FormEvent, ChangeEvent } from 'react';
import AuthService from '../utils/auth'; // Ensure correct import of AuthService
import { login } from '../api/authAPI'; // Ensure login API is correctly implemented

const Login: React.FC = () => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState<string>(''); // State for handling login errors
  const [isLoading, setIsLoading] = useState(false); // State for managing loading state

  // TODO: handle form input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // TODO: handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(''); // Reset error state
    setIsLoading(true); // Start loading

    try {
      // TODO: log the user in and save the token
      const token = await login(loginData);
      AuthService.saveToken(token); // Save token using AuthService utility
      window.location.href = '/'; // Redirect to home page
    } catch (err) {
      console.error('Login failed:', err);
      setError('Invalid username or password. Please try again.');
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <h1>Login</h1>

        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          name="username"
          placeholder="Enter your username"
          value={loginData.username}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="Enter your password"
          value={loginData.password}
          onChange={handleChange}
          required
        />

        {error && <p className="error">{error}</p>} {/* Display error if login fails */}

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;



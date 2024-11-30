import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  // TODO: return the decoded token
  getProfile() {
    const token = this.getToken();
    if (!token) return null;

    try {
      return jwtDecode<JwtPayload>(token);
    } catch (err) {
      console.error('Error decoding token:', err);
      return null;
    }
  }

  // TODO: return a value that indicates if the user is logged in
  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  // TODO: return a value that indicates if the token is expired
  isTokenExpired(token: string) {
    try {
      const { exp } = jwtDecode<JwtPayload>(token);
      if (!exp) return true; // If no expiration, consider token expired
      return Date.now() >= exp * 1000; // Compare current time with expiration
    } catch (err) {
      console.error('Error checking token expiration:', err);
      return true; // Consider expired if any error occurs
    }
  }

  // TODO: return the token
  getToken(): string | null {
    return localStorage.getItem('jwt');
  }

  // TODO: set the token to localStorage
  saveToken(token: string): void {
    localStorage.setItem('jwt', token);
  }

  // TODO: set the token to localStorage and redirect to the home page
  login(token: string): void {
    this.saveToken(token);
    window.location.href = '/';
  }

  // TODO: remove the token from localStorage and redirect to the login page
  logout(): void {
    localStorage.removeItem('jwt');
    window.location.href = '/login';
  }
}

export default new AuthService();




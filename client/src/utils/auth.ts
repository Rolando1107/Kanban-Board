
import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile() {
    const token = this.getToken();
    if (token) {
      return jwtDecode<JwtPayload>(token);
    }
    return null;
  }

  loggedIn() {
    const token = this.getToken();
    return token;
  }

  
  isTokenExpired(token: string) {
    const decoded = jwtDecode<JwtPayload>(token);
    if (decoded.exp) {
      const currentTime = Date.now() / 1000;
      return decoded.exp < currentTime;
    }
    return false;
  }

  getToken(): string {
    const loggedUser = localStorage.getItem('id_token') || '';
    return loggedUser;
  }


  login(idToken: string) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }


  logout() {
    localStorage.removeItem('id_token');
    window.location.assign('/');
  }
}

export default new AuthService();

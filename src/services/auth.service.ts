import axios from "axios";

const API_URL = "http://auth-server.vovan42002.com";
const headers = {
  'Content-type': 'application/x-www-form-urlencoded'
}

class AuthService {
  login(email: string, password: string) {
    const params = new URLSearchParams();
    params.append("username", email);
    params.append("password", password);
    return axios
      .post(API_URL + "/login/token", params, { headers: headers })
      .then(response => {
        if (response.data.access_token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(email: string, password: string) {
    return axios.post(API_URL + "/user", {
      "email": email,
      "password": password
    });
  }

  getCurrentUser() {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);

    return null;
  }
}

export default new AuthService();

import axios from "axios";
import localStorageService from "./localStorageService";

  const logout = async () => {
    await this.setSession(null);
    await this.removeUser();
  }

  const setSession = token => {
    if (token) {
      localStorage.setItem("jwt_token", token);
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    } else {
      localStorage.removeItem("jwt_token");
      delete axios.defaults.headers.common["Authorization"];
    }
  };

  const setUser = (user) => {    
    localStorageService.setItem("auth_user", user);
  }
  
  const removeUser = () => {
    localStorage.removeItem("auth_user");
  }

  
const JwtAuthService = {
    logout,
    setSession,
    setUser,
    removeUser,
};

export default JwtAuthService;


import {LOGIN_SUCCESS, LOGIN_ERROR, LOGIN_LOADING} from "../actions/LoginActions";
import axios from "axios";
import localStorageService from "../../services/localStorageService";

axios.defaults.baseURL = "http://localhost:5051/api";
const user = localStorageService.getItem("auth_user");
if (user)
axios.defaults.headers.common["Authorization"] = "Bearer " + user.token;

const initialState = {
  errormessage: "",
  success: user ? true : false,
  loading: false,
  navigation: [{
    name: "Home",
    description: "Lorem ipsum dolor sit.",
    type: "link",
    icon: "i-Home1",
    path: "/home"
  }],
  error: {
    username: null,
    password: null
  }
};

const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_LOADING: {
      return {
        ...state,
        loading: true,
        success: false,
        errormessage: ""
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        success: true,
        loading: false,
        errormessage: ""
      };
    }
    // case RESET_PASSWORD: {
    //   return {
    //     ...state,
    //     success: false,
    //     loading: false,
    //     errormessage: ""
    //   };
    // }
    case LOGIN_ERROR: {
      return {
        success: false,
        loading: false,
        errormessage: action.payload
      };
    }
    // case USER_LOGGED_OUT: {
    //   return {
    //     ...state,
    //     success: false,
    //     loading: false,
    //     errormessage: ""
    //   };
    // }
    default: {
      return state;
    }
  }
};

export default LoginReducer;

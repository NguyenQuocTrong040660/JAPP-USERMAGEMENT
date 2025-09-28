import jwtAuthService from "../../services/JwtAuthService";
import { setUserData, removeUserData } from "./UserActions";
import apiService from "../../services/apiService";
import { getLangText } from "../../utils/@lang";

export const LOGIN_ERROR = "LOGIN_ERROR";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_LOADING = "LOGIN_LOADING";
export const RESET_PASSWORD = "RESET_PASSWORD";
export const USER_LOGGED_OUT = "USER_LOGGED_OUT";

export function loginWithUserAndPassword({ username, password }) {
  return dispatch => {
    
    dispatch({
      type: LOGIN_LOADING
    });
    
    apiService.sendAPIPost("en", "/user/login", {
      username: username,
      password: password,
      encrypt: false
    }).then(response =>{
      if (response.isSuccess){
        jwtAuthService.setSession(response.data.token);
        jwtAuthService.setUser(response.data);
        dispatch(setUserData(response.data));
        return dispatch({
          type: LOGIN_SUCCESS
        });  
      }else{
        return dispatch({
          type: LOGIN_ERROR,
          payload: response.errorMessage
        });
      }
    });
  };
}

export function resetPassword({ username, email }) {
  return dispatch => {
    
    dispatch({
      type: LOGIN_LOADING
    });
    apiService.sendAPIPost("en", "/user/resetpassword", {
      email: email,
      username: username
    }).then(response =>{
      if (response.isSuccess){
        return dispatch({
          type: RESET_PASSWORD
        }); 
      }else{
        return dispatch({
          type: LOGIN_ERROR,
          payload: response.errorMessage
        });
      }
    });
  };
}

export function resetPasswordWithOTP({ username, email, otp }) {
  return dispatch => {
    dispatch({
      type: LOGIN_LOADING
    });
    apiService.sendAPIPost("en", "/user/resetpassword", {
      email: email,
      code: otp,
      username: username
    }).then(response =>{
      if (response.isSuccess){
        return dispatch({
          type: RESET_PASSWORD,
          payload: { message: getLangText("passwordsuccessreset", 'en') }
        }); 
      }else{
        return dispatch({
          type: LOGIN_ERROR,
          payload: response.errorMessage
        });
      }
    });
  };
}

export function logoutUser() {
  return dispatch => {
    jwtAuthService.logout().then( x => {
      dispatch({
        type: USER_LOGGED_OUT
      });
      dispatch(removeUserData());
    });
  };
}

export function logoutUserWithWarning(textAlert) {
  return dispatch => {
    jwtAuthService.logout().then( x => {
      dispatch({
        type: USER_LOGGED_OUT,
        payload: { warning: textAlert }
      });
      dispatch(removeUserData());
    });
  };
}

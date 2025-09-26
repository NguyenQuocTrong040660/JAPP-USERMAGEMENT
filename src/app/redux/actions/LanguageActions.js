import localStorageService from "../../services/localStorageService";
import { toast } from 'react-toastify';
import { getLangText } from "../../utils/@lang";

export const SET_LANGUAGE_SETTINGS = "LANGUAGE_SET_SETTINGS";
export const SET_DEFAULT_LANGUAGE_SETTINGS = "LANGUAGE_SET_DEFAULT_SETTINGS";

export const setLanguageSettings = data => dispatch => {
  localStorageService.setItem("system_language", data);
  toast.success(getLangText("changelanguagesuccess", data), {
    position: "top-right",
    autoClose: 3000,
  });
  dispatch({
    type: SET_LANGUAGE_SETTINGS,
    data: data
  });
};

export const setDefaultSettings = data => dispatch => {
  dispatch({
    type: SET_DEFAULT_LANGUAGE_SETTINGS,
    data: data
  });
};
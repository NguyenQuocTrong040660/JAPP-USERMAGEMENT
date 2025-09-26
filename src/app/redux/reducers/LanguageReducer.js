import { SET_LANGUAGE_SETTINGS, SET_DEFAULT_LANGUAGE_SETTINGS } from "../actions/LanguageActions.js";
import localStorageService from "../../services/localStorageService";

const lang = localStorageService.getItem("system_language");
const initialState = {
  lang : lang ? lang : "en"
};

const LayoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LANGUAGE_SETTINGS:
      return {
        ...state,
        lang : action.data
      };
    case SET_DEFAULT_LANGUAGE_SETTINGS:
      return { lang : "en" };
    default:
      return state;
  }
};

export default LayoutReducer;

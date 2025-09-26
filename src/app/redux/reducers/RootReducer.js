import { combineReducers } from "redux";
import LoginReducer from "./LoginReducer";
import UserReducer from "./UserReducer";
import LanguageReducer from "./LanguageReducer";
import LayoutReducer from "./LayoutReducer";


const RootReducer = combineReducers({
    login: LoginReducer,
    user: UserReducer,
    language: LanguageReducer,
    layout: LayoutReducer
});

export default RootReducer;

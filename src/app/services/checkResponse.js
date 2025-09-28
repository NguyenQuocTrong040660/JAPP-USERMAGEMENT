import axios from "axios";
import { getLangText } from "../utils/@lang";
import { NotificationManager } from "react-notifications"; 
import { Store } from "../redux/Store";
import { logoutUserWithWarning } from "../redux/actions/LoginActions";

export const handleReponse = (language) => {
    return axios.interceptors.response.use(function (response) {
        return response;
      }, function (error) {
        if (isNetworkError(error)){
          NotificationManager.error("Error when connecting to server", "Network Information", 3000);
          var data = { errorcode : "-9999", messagedetail :  "Network error. Please try again later" }
          error.response = { data };
        }else{
          if (error.response.status === 401){
            Store.dispatch(logoutUserWithWarning(getLangText("401Unauthorized", language)));
          }
        }
      return Promise.reject(error);
    });
}

export const isNetworkError = (errorObject) => {
  return errorObject.message === "Network Error" ||
      errorObject.message === "net::ERR_INTERNET_DISCONNECTED" ||
      errorObject.message === "net::ERR_PROXY_CONNECTION_FAILED" ||
      errorObject.message === "net::ERR_CONNECTION_RESET" ||
      errorObject.message === "net::ERR_CONNECTION_CLOSE" ||
      errorObject.message === "net::ERR_NAME_NOT_RESOLVED" ||
      errorObject.message === "net::ERR_CONNECTION_TIMED_OUT";
}
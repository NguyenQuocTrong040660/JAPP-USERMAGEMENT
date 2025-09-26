// services/apiService.js
import axios from "axios";

const analysisResponseSuccess = (language, response) => {
    if (response?.data?.errorcode === 0) {
        return {
            data: response.data.result,
            isSuccess: true,
            errorCode: 0,
            errorMessage: "",
        };
    }
    return {
        data: {},
        isSuccess: false,
        errorCode: response?.data?.errorcode,
        errorMessage: response?.data?.messagedetail,
    };
};

const analysisResponseFail = (language, error) => {
    if (error?.response?.data?.errorcode) {
        return {
            data: {},
            isSuccess: false,
            errorCode: error.response.data.errorcode,
            errorMessage: error.response.data.messagedetail,
        };
    }
    return {
        data: {},
        isSuccess: false,
        errorCode: -9999,
        errorMessage: "Network Error",
    };
};

const isNetworkError = (err) =>
    err?.message === "Network Error" ||
    err?.message === "net::ERR_INTERNET_DISCONNECTED" ||
    err?.message === "net::ERR_PROXY_CONNECTION_FAILED" ||
    err?.message === "net::ERR_CONNECTION_RESET" ||
    err?.message === "net::ERR_CONNECTION_CLOSE" ||
    err?.message === "net::ERR_NAME_NOT_RESOLVED" ||
    err?.message === "net::ERR_CONNECTION_TIMED_OUT";

const sendAPIPost = async (language, path, params) => {
    try {
        const response = await axios.post(path, params);
        return analysisResponseSuccess(language, response);
    } catch (error) {
        return analysisResponseFail(language, error);
    }
};

const sendAPIGet = async (language, path, params) => {
    try {
        // LƯU Ý: axios.get(path, { params }) để map vào query string
        const response = await axios.get(path, { params });
        return analysisResponseSuccess(language, response);
    } catch (error) {
        return analysisResponseFail(language, error);
    }
};

const sendAPI = async (method, language, path, params) => {
    if (method === "POST") return sendAPIPost(language, path, params);
    return sendAPIGet(language, path, params);
};

const apiService = {
    sendAPIPost,
    sendAPIGet,
    sendAPI,
    analysisResponseSuccess,
    analysisResponseFail,
    isNetworkError,
};

export default apiService;

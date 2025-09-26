import { getLangText, getLangTextbyJson } from "../../utils/@lang";
import { toNumber } from "lodash";

export const validationbyControl = (language, values, validation, controlName, controlValue) => {
    var errorMessage = "";
    let control = validation[controlName];
    let valueOfAnotherControl;
    if (control) {
        Object.keys(control).map(function (key, index) {
            if (errorMessage && errorMessage.length > 0) return errorMessage;
            switch (key) {
                case "isRequired":
                    if (control[key] === true && (!controlValue || controlValue.length === 0 || controlValue === "" || controlValue === undefined))
                        errorMessage = "[" + getLangTextbyJson(control["caption"], language) + "] " + getLangText("isRequired", language);
                    break;
                case "minLength":
                    if (controlValue && toNumber(controlValue.length) < toNumber(control[key]) && toNumber(control[key]) > 0)
                        errorMessage =
                            "[" +
                            getLangTextbyJson(control["caption"], language) +
                            "] " +
                            getLangText("minLength", language) +
                            " " +
                            toNumber(control[key]);
                    break;
                case "maxLength":
                    if (controlValue && toNumber(controlValue.length) > toNumber(control[key]) && toNumber(control[key]) > 0)
                        errorMessage =
                            "[" +
                            getLangTextbyJson(control["caption"], language) +
                            "] " +
                            getLangText("maxLength", language) +
                            " " +
                            toNumber(control[key]);
                    break;
                case "regex":
                    switch (control[key]) {
                        case "email":
                            let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                            if (controlValue && toNumber(controlValue.length) > 0 && !controlValue.toLowerCase().match(emailRegex))
                                errorMessage = "[" + getLangTextbyJson(control["caption"], language) + "] " + getLangText("emailregex", language);
                            break;
                        case "password":
                            let passwordUpperCase = /^(?=.*[A-Z])([a-zA-Z0-9]+)$/;
                            let passwordLowerCase = /^(?=.*[a-z])([a-zA-Z0-9]+)$/;
                            let passwordDigitCase = /^(?=.*[0-9])([a-zA-Z0-9]+)$/;
                            if (controlValue && toNumber(controlValue.length) > 0 && !controlValue.match(passwordUpperCase))
                                errorMessage =
                                    "[" + getLangTextbyJson(control["caption"], language) + "] " + getLangText("passwordupperregex", language);
                            if (controlValue && toNumber(controlValue.length) > 0 && !controlValue.match(passwordLowerCase))
                                errorMessage =
                                    "[" + getLangTextbyJson(control["caption"], language) + "] " + getLangText("passwordlowerregex", language);
                            if (controlValue && toNumber(controlValue.length) > 0 && !controlValue.match(passwordDigitCase))
                                errorMessage =
                                    "[" + getLangTextbyJson(control["caption"], language) + "] " + getLangText("passworddigitregex", language);
                            break;
                        case "username":
                            let userRegex = /^[a-zA-Z0-9]+$/;
                            if (controlValue && toNumber(controlValue.length) > 0 && !controlValue.toLowerCase().match(userRegex))
                                errorMessage = "[" + getLangTextbyJson(control["caption"], language) + "] " + getLangText("usernameregex", language);
                            break;
                        default:
                            break;
                    }
                    break;
                case "isSame":
                    valueOfAnotherControl = values[control[key]];
                    if (controlValue && controlValue !== valueOfAnotherControl && control[key] && control[key].length > 0)
                        errorMessage =
                            "[" +
                            getLangTextbyJson(control["caption"], language) +
                            "] " +
                            getLangText("isSame", language) +
                            " [" +
                            getLangTextbyJson(validation[control[key]]["caption"], language) +
                            "]";
                    break;
                case "isNotSame":
                    valueOfAnotherControl = values[control[key]];
                    if (controlValue && controlValue === valueOfAnotherControl && control[key] && control[key].length > 0)
                        errorMessage =
                            "[" +
                            getLangTextbyJson(control["caption"], language) +
                            "] " +
                            getLangText("isNotSame", language) +
                            " [" +
                            getLangTextbyJson(validation[control[key]]["caption"], language) +
                            "]";
                    break;
                default:
                    break;
            }
            return errorMessage;
        });
    }
    return { errorMessage, isSuccess: errorMessage.length === 0 };
};

export const validationAllControl = (language, values, validation) => {
    var errorMessage = {};
    let valueOfAnotherControl;
    Object.keys(validation).map(function (key, index) {
        Object.keys(validation[key]).map(function (key2, index) {
            if (errorMessage[key] && errorMessage[key].length > 0) return errorMessage;
            switch (key2) {
                case "isRequired":
                    if (validation[key][key2] === true && (values[key] === 0 || values[key] === "" || values[key] === undefined))
                        errorMessage[key] =
                            "[" + getLangTextbyJson(validation[key]["caption"], language) + "] " + getLangText("isRequired", language);
                    return errorMessage;
                case "minLength":
                    if (values[key] && toNumber(values[key].length) < toNumber(validation[key][key2]) && toNumber(validation[key][key2]) > 0)
                        errorMessage[key] =
                            "[" +
                            getLangTextbyJson(validation[key]["caption"], language) +
                            "] " +
                            getLangText("minLength", language) +
                            " " +
                            toNumber(validation[key][key2]);
                    return errorMessage;
                case "maxLength":
                    if (values[key] && toNumber(values[key].length) > toNumber(validation[key][key2]) && toNumber(validation[key][key2]) > 0)
                        errorMessage[key] =
                            "[" +
                            getLangTextbyJson(validation[key]["caption"], language) +
                            "] " +
                            getLangText("maxLength", language) +
                            " " +
                            toNumber(validation[key][key2]);
                    return errorMessage;
                case "regex":
                    switch (validation[key][key2]) {
                        case "email":
                            let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                            if (values[key] && toNumber(values[key].length) > 0 && !values[key].toLowerCase().match(emailRegex))
                                errorMessage[key] =
                                    "[" + getLangTextbyJson(validation[key]["caption"], language) + "] " + getLangText("emailregex", language);
                            break;
                        case "password":
                            let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/;
                            if (values[key] && toNumber(values[key].length) > 0 && !values[key].toLowerCase().match(passwordRegex))
                                errorMessage[key] =
                                    "[" + getLangTextbyJson(validation[key]["caption"], language) + "] " + getLangText("passwordregex", language);
                            break;
                        case "username":
                            let userRegex = /^[a-zA-Z0-9]+$/;
                            if (values[key] && toNumber(values[key].length) > 0 && !values[key].toLowerCase().match(userRegex))
                                errorMessage[key] =
                                    "[" + getLangTextbyJson(validation[key]["caption"], language) + "] " + getLangText("usernameregex", language);
                            break;
                        default:
                            break;
                    }
                    return errorMessage;
                case "isSame":
                    if (validation[key][key2]) {
                        valueOfAnotherControl = values[validation[key][key2]];
                        if (values[key] && values[key] !== valueOfAnotherControl && validation[key][key2] && validation[key][key2].length > 0)
                            errorMessage[key] =
                                "[" +
                                getLangTextbyJson(validation[key]["caption"], language) +
                                "] " +
                                getLangText("isSame", language) +
                                " [" +
                                getLangTextbyJson(validation[validation[key][key2]]["caption"], language) +
                                "]";
                    }
                    return errorMessage;
                case "isNotSame":
                    if (validation[key][key2]) {
                        valueOfAnotherControl = values[validation[key][key2]];
                        if (values[key] && values[key] === valueOfAnotherControl && validation[key][key2] && validation[key][key2].length > 0)
                            errorMessage[key] =
                                "[" +
                                getLangTextbyJson(validation[key]["caption"], language) +
                                "] " +
                                getLangText("isNotSame", language) +
                                " [" +
                                getLangTextbyJson(validation[validation[key][key2]]["caption"], language) +
                                "]";
                    }
                    return errorMessage;
                default:
                    return errorMessage;
            }
        });
        return errorMessage;
    });
    return { errorMessage, isSuccess: Object.keys(errorMessage).length === 0 };
};

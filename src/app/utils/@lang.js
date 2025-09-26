import {en, vi} from "../config/language";

export const getLangText = (textKey, lang) => {
    switch (lang) {
        case 'en':
            return en[textKey];
        case 'vi':
            return (vi[textKey] === '' || vi[textKey] === undefined) ? en[textKey] : vi[textKey];
        default:
            return en[textKey];
    }
}

export const getLangTextbyJson = (data, lang) =>{
    try {
        const language = JSON.parse(data);
        return ((language[lang] === '' || language[lang] === undefined)? language['en'] : language[lang]);
    } catch (error) {
        return "Error Label";
    }

}

export const countries = [
{ code: 'en', title: 'English' },
{ code: 'vi', title: 'Việt Nam' }
]
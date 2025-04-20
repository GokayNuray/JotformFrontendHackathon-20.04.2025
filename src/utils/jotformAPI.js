import {API_KEY, FORM_ID, FORM_INFO_API} from "./constants.js";

function getFormInfo(callback) {
    fetch(FORM_INFO_API(FORM_ID) + "?apiKey=" + API_KEY)
        .then(response => response.json())
        .then(data => {
            if (data.message === "success") {
                callback(data.content);
            } else alert(data.message);
        });
}

export {
    getFormInfo
}
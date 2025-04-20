const URL = "https://api.jotform.com";
const FORM_INFO_API  = (id) => URL + "/form/" + id + "/payment-info";
const FORM_QUESTIONS_API = (id) => URL + "/form/" + id + "/questions";
const SUBMIT_API = (id) => URL + "/form/" + id + "/submissions";

const FORM_ID = "251073633222952"
const API_KEY = "187c7ad924588e8fba971f1fa048f1fe"

export {
    FORM_INFO_API,
    SUBMIT_API,
    FORM_QUESTIONS_API,
    FORM_ID,
    API_KEY
}
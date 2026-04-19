const email = document.getElementById("email");
const vollName = document.getElementById("name");
const userMessage = document.getElementById("message");
const accept_police = document.getElementById("accept-privacy");
let isRequiredMessageName = document.getElementById("error-message-name");
let isRequiredMessageEmail = document.getElementById("error-message-email");
let isRequiredMessage = document.getElementById("error-message-message");
let sendenButton = document.getElementById("sendenButton");

// Hilfsfunktion für Übersetzungen
function getTranslation(key, fallback) {
    if (typeof translationMap !== 'undefined' && typeof currentLanguage !== 'undefined') {
        const langData = translationMap[currentLanguage] || {};
        return langData[key] || fallback;
    }
    return fallback;
}

function setFieldState(messageElement, inputElement, isValid, message) {
    if (isValid) {
        messageElement.textContent = "";
        messageElement.classList.remove("success-state", "error-state");
        messageElement.style.opacity = "0";
    } else {
        messageElement.textContent = message;
        messageElement.classList.remove("success-state", "error-state");
        messageElement.classList.add("error-state");
        messageElement.style.opacity = "1";
    }
    const iconHost = inputElement.closest(".field-with-icon");
    const stateTarget = iconHost || inputElement;
    stateTarget.classList.remove("input-success-state", "input-error-state");
    stateTarget.classList.add(isValid ? "input-success-state" : "input-error-state");
}

// Only letters, spaces, hyphens and apostrophes — no HTML/script tags or special chars
const nameRegex = /^[a-zA-ZÀ-ÖØ-öø-ÿ'' \-]{2,100}$/;

function validateName() {
    const value = vollName.value.trim();
    if (value.length < 5) {
        const message = getTranslation("errorNameRequired", "Your name is required (min. 5 characters).");
        setFieldState(isRequiredMessageName, vollName, false, message);
        return false;
    }
    if (!nameRegex.test(value)) {
        const message = getTranslation("errorNameInvalid", "Invalid characters in name. No HTML or special characters allowed.");
        setFieldState(isRequiredMessageName, vollName, false, message);
        return false;
    }
    setFieldState(isRequiredMessageName, vollName, true, "Name looks good.");
    return true;
}

function validateEmail() {
    const value = email.value.trim();
    const emailRegex = /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)+$/;
    if (value === "") {
        const message = getTranslation("errorEmailRequired", "Your email is required.");
        setFieldState(isRequiredMessageEmail, email, false, message);
        return false;
    }
    if (/[<>]/.test(value)) {
        const message = getTranslation("errorEmailInvalid", "Please enter a valid email address.");
        setFieldState(isRequiredMessageEmail, email, false, message);
        return false;
    }
    if (!emailRegex.test(value)) {
        const message = getTranslation("errorEmailInvalid", "Please enter a valid email address.");
        setFieldState(isRequiredMessageEmail, email, false, message);
        return false;
    }
    setFieldState(isRequiredMessageEmail, email, true, "Email looks good.");
    return true;
}

// Blocks HTML/script patterns, including partial tags like "<script" without closing ">".
const scriptRegex = /[<>]|script\b|javascript\s*:|on\w+\s*=|data\s*:/i;

function validateMessage() {
    const value = userMessage.value.trim();
    if (value.length < 10) {
        const message = getTranslation("errorMessageRequired", "Your message is required (min. 10 characters).");
        setFieldState(isRequiredMessage, userMessage, false, message);
        return false;
    }
    if (scriptRegex.test(value)) {
        const message = getTranslation("errorMessageInvalid", "Invalid content detected. No HTML or script code allowed.");
        setFieldState(isRequiredMessage, userMessage, false, message);
        return false;
    }
    setFieldState(isRequiredMessage, userMessage, true, "Message looks good.");
    return true;
}

function validatePrivacy() {
    checkFormValidity();
}

function checkFormValidity() {
    const isValid = validateName() && validateEmail() && validateMessage() && accept_police.checked;
    sendenButton.disabled = !isValid;
}

function renderMailStatusFromUrl() {
    const statusElement = document.getElementById("mail-status");
    if (!statusElement) {
        return;
    }

    const params = new URLSearchParams(window.location.search);
    const mailStatus = params.get("mail");
    if (!mailStatus) {
        return;
    }

    statusElement.classList.remove("success", "error");

    if (mailStatus === "success") {
        const message = getTranslation("mailSuccess", "Message sent successfully. Thank you!");
        statusElement.textContent = message;
        statusElement.classList.add("success");
    } else {
        const message = getTranslation("mailError", "Message could not be sent. Please try again.");
        statusElement.textContent = message;
        statusElement.classList.add("error");
    }

    params.delete("mail");
    const newQuery = params.toString();
    const newUrl = newQuery
        ? `${window.location.pathname}?${newQuery}${window.location.hash}`
        : `${window.location.pathname}${window.location.hash}`;
    window.history.replaceState({}, "", newUrl);
}

document.addEventListener("DOMContentLoaded", renderMailStatusFromUrl);






const email = document.getElementById("email");
const vollName = document.getElementById("name");
const userMessage = document.getElementById("message");
const accept_police = document.getElementById("accept-privacy");
let isRequiredMessageName = document.getElementById("error-message-name");
let isRequiredMessageEmail = document.getElementById("error-message-email");
let isRequiredMessage = document.getElementById("error-message-message");
let sendenButton = document.getElementById("sendenButton");

/**
 * Returns a translation for a key or a fallback text.
 *
 * @param {string} key The translation key.
 * @param {string} fallback The default text when no translation exists.
 * @returns {string}
 */
function getTranslation(key, fallback) {
    if (typeof translationMap !== 'undefined' && typeof currentLanguage !== 'undefined') {
        const langData = translationMap[currentLanguage] || {};
        return langData[key] || fallback;
    }
    return fallback;
}

/**
 * Updates the validation state, message, and styling of a form field.
 *
 * @param {HTMLElement} messageElement The element that displays the feedback message.
 * @param {HTMLElement} inputElement The input field being validated.
 * @param {boolean} isValid Indicates whether the field is valid.
 * @param {string} message The message to display.
 * @returns {void}
 */
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

/**
 * Validates the name field for minimum length and allowed characters.
 *
 * @returns {boolean}
 */
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

/**
 * Validates the email field for a safe and valid format.
 *
 * @returns {boolean}
 */
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

const scriptRegex = /[<>]|script\b|javascript\s*:|on\w+\s*=|data\s*:/i;

/**
 * Validates the message for minimum length and disallowed content.
 *
 * @returns {boolean}
 */
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

/**
 * Triggers form validation after the privacy selection changes.
 *
 * @returns {void}
 */
function validatePrivacy() {
    checkFormValidity();
}

/**
 * Enables or disables the submit button based on the overall validation state.
 *
 * @returns {void}
 */
function checkFormValidity() {
    const isValid = validateName() && validateEmail() && validateMessage() && accept_police.checked;
    sendenButton.disabled = !isValid;
}

/**
 * Returns the modal content configuration for a mail status.
 *
 * @param {string} mailStatus The mail status from the URL.
 * @returns {{kicker: string, title: string, message: string, state: string}|null}
 */
function getMailStatusConfig(mailStatus) {
    if (!mailStatus) {
        return null;
    }

    const isSuccess = mailStatus === "success";
    return {
        kicker: isSuccess ? getTranslation("mailSuccessKicker", "Success") : getTranslation("mailErrorKicker", "Error"),
        title: isSuccess ? getTranslation("mailSuccess", "Message sent successfully. Thank you!") : getTranslation("mailError", "Message could not be sent. Please try again."),
        message: isSuccess
            ? getTranslation("mailSuccessDetail", "Your message has been sent successfully. I will get back to you as soon as possible.")
            : getTranslation("mailErrorDetail", "There was a problem sending your message. Please try again or contact me directly by email."),
        state: isSuccess ? "success" : "error"
    };
}

/**
 * Closes the status modal.
 *
 * @returns {void}
 */
function closeStatusModal() {
    const modal = document.getElementById("status-modal");
    modal?.classList.remove("is-open");
    modal?.setAttribute("aria-hidden", "true");
}

/**
 * Opens the status modal with translated content.
 *
 * @param {string} mailStatus The mail status from the URL.
 *
 * @returns {void}
 */
function openStatusModal(mailStatus) {
    const modal = document.getElementById("status-modal");
    const dialog = modal?.querySelector(".status-modal__dialog");
    const config = getMailStatusConfig(mailStatus);

    if (!modal || !dialog || !config) {
        return;
    }

    document.getElementById("status-modal-kicker").textContent = config.kicker;
    document.getElementById("status-modal-title").textContent = config.title;
    document.getElementById("status-modal-message").textContent = config.message;
    document.getElementById("status-modal-button").textContent = getTranslation("modalClose", "Close");
    dialog.classList.toggle("is-success", config.state === "success");
    dialog.classList.toggle("is-error", config.state === "error");
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
}

/**
 * Removes the mail status query parameter from the current URL.
 *
 * @returns {void}
 */
function clearMailStatusFromUrl() {
    const params = new URLSearchParams(window.location.search);
    params.delete("mail");
    const newQuery = params.toString();
    const newUrl = newQuery
        ? `${window.location.pathname}?${newQuery}${window.location.hash}`
        : `${window.location.pathname}${window.location.hash}`;

    window.history.replaceState({}, "", newUrl);
}

/**
 * Reads the mail status from the URL and opens the matching status modal.
 *
 * @returns {void}
 */
function renderMailStatusFromUrl() {
    const mailStatus = new URLSearchParams(window.location.search).get("mail");

    if (!mailStatus) {
        return;
    }

    openStatusModal(mailStatus);
    clearMailStatusFromUrl();
}

document.addEventListener("click", (event) => {
    if (event.target.closest("[data-close-status-modal='true']") || event.target.id === "status-modal-button") {
        closeStatusModal();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeStatusModal();
    }
});

document.addEventListener("DOMContentLoaded", renderMailStatusFromUrl);






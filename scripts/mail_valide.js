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
const emailRegex = /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)+$/;
const scriptRegex = /[<>]|script\b|javascript\s*:|on\w+\s*=|data\s*:/i;
const MIN_MESSAGE_LENGTH = 10;

/**
 * Checks whether a name value is valid.
 *
 * @param {string} value The name value.
 * @returns {boolean}
 */
function isNameValueValid(value) {
    return value.length >= 5 && nameRegex.test(value);
}

/**
 * Checks whether an email value is valid.
 *
 * @param {string} value The email value.
 * @returns {boolean}
 */
function isEmailValueValid(value) {
    return value !== "" && !/[<>]/.test(value) && emailRegex.test(value);
}

/**
 * Checks whether a message value is valid.
 *
 * @param {string} value The message value.
 * @returns {boolean}
 */
function isMessageValueValid(value) {
    return value.length >= MIN_MESSAGE_LENGTH && !scriptRegex.test(value);
}

/**
 * Returns an error message containing the minimum message length and remaining chars.
 *
 * @param {number} currentLength Current message length.
 * @returns {string}
 */
function getMessageMinLengthError(currentLength) {
    const remaining = Math.max(0, MIN_MESSAGE_LENGTH - currentLength);
    const baseText = getTranslation("errorMessageRequired", "Your message is required.");
    const minLengthText = getTranslation("errorMessageMinLength", "Minimum length: {min} characters.").replace("{min}", String(MIN_MESSAGE_LENGTH));
    const remainingText = getTranslation("errorMessageRemaining", "Remaining: {remaining}.").replace("{remaining}", String(remaining));

    return `${baseText} ${minLengthText} ${remainingText}`.trim();
}

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
    if (!isNameValueValid(value)) {
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
    if (value === "") {
        const message = getTranslation("errorEmailRequired", "Your email is required.");
        setFieldState(isRequiredMessageEmail, email, false, message);
        return false;
    }
    if (!isEmailValueValid(value)) {
        const message = getTranslation("errorEmailInvalid", "Please enter a valid email address.");
        setFieldState(isRequiredMessageEmail, email, false, message);
        return false;
    }
    setFieldState(isRequiredMessageEmail, email, true, "Email looks good.");
    return true;
}

/**
 * Validates the message for minimum length and disallowed content.
 *
 * @returns {boolean}
 */
function validateMessage() {
    const value = userMessage.value.trim();
    if (value.length < MIN_MESSAGE_LENGTH) {
        const message = getMessageMinLengthError(value.length);
        setFieldState(isRequiredMessage, userMessage, false, message);
        return false;
    }
    if (!isMessageValueValid(value)) {
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
    const isValid = isNameValueValid(vollName.value.trim())
        && isEmailValueValid(email.value.trim())
        && isMessageValueValid(userMessage.value.trim())
        && accept_police.checked;
    sendenButton.disabled = !isValid;
}

/**
 * Binds a live validation handler to an input event.
 *
 * @param {HTMLElement} element The element to observe.
 * @param {() => boolean} validator The validator callback.
 * @returns {void}
 */
function bindLiveValidation(element, validator) {
    element.addEventListener("input", () => {
        validator();
        checkFormValidity();
    });
}

/**
 * Initializes live validation while typing.
 *
 * @returns {void}
 */
function initLiveValidation() {
    if (!vollName || !email || !userMessage || !accept_police || !sendenButton) {
        return;
    }
    bindLiveValidation(vollName, validateName);
    bindLiveValidation(email, validateEmail);
    bindLiveValidation(userMessage, validateMessage);
    accept_police.addEventListener("change", checkFormValidity);
    const form = sendenButton.closest("form");
    form?.addEventListener("submit", (event) => {
        const isFormValid = validateName() && validateEmail() && validateMessage() && accept_police.checked;
        checkFormValidity();
        if (!isFormValid) {
            event.preventDefault();
        }
    });
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
    const kicker = modal?.querySelector("#status-modal-kicker");
    const title = modal?.querySelector("#status-modal-title");
    const message = modal?.querySelector("#status-modal-message");
    const config = getMailStatusConfig(mailStatus);

    if (!modal || !dialog || !kicker || !title || !message || !config) {
        return;
    }

    kicker.textContent = config.kicker;
    title.textContent = config.title;
    message.textContent = config.message;
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
    if (!(event.target instanceof Element)) {
        return;
    }

    if (event.target.closest("[data-close-status-modal='true']")) {
        closeStatusModal();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeStatusModal();
    }
});

document.addEventListener("DOMContentLoaded", () => {
    initLiveValidation();
    checkFormValidity();
    renderMailStatusFromUrl();
});






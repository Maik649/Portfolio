const TRANSLATE_DB = new URL(
  "translate.json",
  document.querySelector('script[src$="translate.js"]')?.src || window.location.href
).href;
let translationMap = {};
let currentLanguage = localStorage.getItem("portfolio-language") || "de";

if (typeof window.mobil_menue !== "function") {
  window.mobil_menue = function mobil_menue() {
    document.getElementById("nav")?.classList.toggle("is-open");
    document.querySelector(".hamburg")?.classList.toggle("checked");
  };
}

async function database() {
  const connect = await fetch(TRANSLATE_DB);
  translationMap = await connect.json();

  setupLanguageButtons();
  setLanguage(currentLanguage);
}

function setupLanguageButtons() {
  const buttonDe = document.getElementById("launch-button-de");
  const buttonEn = document.getElementById("launch-button-en");

  if (buttonDe && !buttonDe.dataset.translateBound) {
    buttonDe.addEventListener("click", () => setLanguage("de"));
    buttonDe.dataset.translateBound = "true";
  }

  if (buttonEn && !buttonEn.dataset.translateBound) {
    buttonEn.addEventListener("click", () => setLanguage("en"));
    buttonEn.dataset.translateBound = "true";
  }
}

function setLanguage(language) {
  if (!translationMap[language]) {
    return;
  }

  currentLanguage = language;
  localStorage.setItem("portfolio-language", language);
  document.documentElement.lang = language;
  updateLanguageButtons();
  renderTemplate();
  
  // Re-render references if the function exists
  if (typeof renderReference === "function") {
    const refContent = document.getElementById("reference-content");
    if (refContent) {
      refContent.innerHTML = "";
      renderReference();
    }
  }
}

function updateLanguageButtons() {
  const buttonDe = document.getElementById("launch-button-de");
  const buttonEn = document.getElementById("launch-button-en");

  buttonDe?.classList.toggle("is-active", currentLanguage === "de");
  buttonEn?.classList.toggle("is-active", currentLanguage === "en");
}

function renderTemplate() {
  const languageData = translationMap[currentLanguage] || {};
  const translatableElements = document.querySelectorAll("[data-i18n]");
  const placeholderElements = document.querySelectorAll("[data-i18n-placeholder]");
  const ariaLabelElements = document.querySelectorAll("[data-i18n-aria-label]");
  const titleElements = document.querySelectorAll("[data-i18n-title]");

  translatableElements.forEach((element) => {
    const key = element.dataset.i18n;
    const translatedText = languageData[key];

    if (typeof translatedText === "string") {
      element.textContent = translatedText;
    }
  });

  placeholderElements.forEach((element) => {
    const key = element.dataset.i18nPlaceholder;
    const translatedText = languageData[key];

    if (typeof translatedText === "string") {
      element.setAttribute("placeholder", translatedText);
    }
  });

  ariaLabelElements.forEach((element) => {
    const key = element.dataset.i18nAriaLabel;
    const translatedText = languageData[key];

    if (typeof translatedText === "string") {
      element.setAttribute("aria-label", translatedText);
    }
  });

  titleElements.forEach((element) => {
    const key = element.dataset.i18nTitle;
    const translatedText = languageData[key];

    if (typeof translatedText === "string") {
      element.textContent = translatedText;
    }
  });
}

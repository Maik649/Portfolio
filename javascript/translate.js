const TRANSLATE_DB = "javascript/translate.json";
let translationMap = {};
let currentLanguage = "de";

async function database() {
  const connect = await fetch(TRANSLATE_DB);
  translationMap = await connect.json();

  setupLanguageButtons();
  setLanguage(currentLanguage);
}

function setupLanguageButtons() {
  const buttonDe = document.getElementById("launch-button-de");
  const buttonEn = document.getElementById("launch-button-en");

  if (buttonDe) {
    buttonDe.addEventListener("click", () => setLanguage("de"));
  }

  if (buttonEn) {
    buttonEn.addEventListener("click", () => setLanguage("en"));
  }
}

function setLanguage(language) {
  if (!translationMap[language]) {
    return;
  }

  currentLanguage = language;
  document.documentElement.lang = language;
  renderTemplate();
}

function renderTemplate() {
  const languageData = translationMap[currentLanguage] || {};
  const translatableElements = document.querySelectorAll("[data-i18n]");

  translatableElements.forEach((element) => {
    const key = element.dataset.i18n;
    const translatedText = languageData[key];

    if (typeof translatedText === "string") {
      element.textContent = translatedText;
    }
  });

  const buttonDe = document.getElementById("launch-button-de");
  const buttonEn = document.getElementById("launch-button-en");

  if (buttonDe && buttonEn) {
    buttonDe.disabled = currentLanguage === "de";
    buttonEn.disabled = currentLanguage === "en";
  }
}

function renderReference() {
  const refContent = document.getElementById("reference-content");
  if (!refContent) {
    return;
  }

  // Prevent duplicate cards when renderReference is triggered multiple times.
  refContent.innerHTML = "";

  for (let index = 0; index < referenceData.length; index++) {
    const ref = referenceData[index];
    refContent.innerHTML += templateReference(ref);
  }
}

function templateReference(ref) {
  const langData = translationMap[currentLanguage] || {};
  const refName = langData[ref.nameKey] || ref.refName;
  const refPosition = langData[ref.positionKey] || ref.refPosition;
  const refText = langData[ref.textKey] || ref.refText;
  
  return `<div class="reference-card">
            <p class="reference-quote">,,</p>
            <span class="reference-name">${refName}</span>
            <span class="reference-position --font-family-overpass-regular">${refPosition}</span>
            <span class="reference-text --font-family-overpass-regular">${refText}</span>
        </div>`;
}

const referenceData = [
  {
    id: 1,
    nameKey: "referenceName1",
    positionKey: "referencePosition1",
    textKey: "referenceText1",
    refName: "Oleg",
    refPosition: "Team Member",
    refText: "Die Zusammenarbeit mit Maik hat wirklich Spaß gemacht...",
  },
  {
    id: 2,
    nameKey: "referenceName2",
    positionKey: "referencePosition2",
    textKey: "referenceText2",
    refName: "Rene",
    refPosition: "Team Member",
    refText: "Die Zusammenarbeit mit Maik war sehr angenehm...",
  },
  {
    id: 3,
    nameKey: "referenceName3",
    positionKey: "referencePosition3",
    textKey: "referenceText3",
    refName: "Jessica",
    refPosition: "Team Member",
    refText: "Maik hat sich sehr in unserem Projekt engagiert...",
  },
];

function renderReference() {
  let refContent = document.getElementById("reference-content");
  for (let index = 0; index < referenceData.length; index++) {
    const ref = referenceData[index];
    refContent.innerHTML += templateReference(ref);
  }
    
    
}

function templateReference(ref) {
  return `<div class="reference-card">
            <p class="reference-quote">,,</p>
            <span class="reference-name" data-i18n="">${ref.refName}</span>
            <span class="reference-position --font-family-overpass-regular" data-i18n="referencePosition">${ref.refPosition}</span>
            <span class="reference-text --font-family-overpass-regular" data-i18n="referenceText">${ref.refText}</span>
        </div>`;
}

const referenceData = [
  {
    id: 1,
    refName: "Oleg",
    refPosition: "Team Member",
    refText:
      "Die Zusammenarbeit mit Maik war eine großartige Erfahrung. Er ist ein talentierter Entwickler, der immer bereit ist, neue Herausforderungen anzunehmen und innovative Lösungen zu finden. Seine Fähigkeiten in JavaScript und React haben unser Projekt erheblich vorangebracht, und seine positive Einstellung macht ihn zu einem wertvollen Teammitglied. ",
  },
  {
    id: 2,
    refName: "Rene",
    refPosition: "Team Member",
    refText:
      "Die Zusammenarbeit mit Maik war eine großartige Erfahrung. Er ist ein talentierter Entwickler, der immer bereit ist, neue Herausforderungen anzunehmen und innovative Lösungen zu finden. Seine Fähigkeiten in JavaScript und React haben unser Projekt erheblich vorangebracht, und seine positive Einstellung macht ihn zu einem wertvollen Teammitglied. ",
  },
  {
    id: 3,
    refName: "Jessica",
    refPosition: "Team Member",
    refText:
      "Die Zusammenarbeit mit Maik war eine großartige Erfahrung. Er ist ein talentierter Entwickler, der immer bereit ist, neue Herausforderungen anzunehmen und innovative Lösungen zu finden. Seine Fähigkeiten in JavaScript und React haben unser Projekt erheblich vorangebracht, und seine positive Einstellung macht ihn zu einem wertvollen Teammitglied. ",
  },
];

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
      "Die Zusammenarbeit mit Maik hat wirklich Spaß gemacht. Er war immer aktiv im Team dabei und man konnte sich jederzeit auf ihn verlassen. Wenn jemand Hilfe gebraucht hat, war er sofort zur Stelle und hat unterstützt.Was ich besonders geschätzt habe: Er hat immer gute Laune mitgebracht und dadurch auch andere motiviert. Selbst in stressigen Situationen ist er ruhig geblieben und hat geholfen, Lösungen zu finden. Insgesamt war die Arbeit mit ihm sehr angenehm, und ich würde jederzeit wieder mit ihm im Team arbeiten.",
  },
  {
    id: 2,
    refName: "Rene",
    refPosition: "Team Member",
    refText:
      "Die Zusammenarbeit mit Maik war sehr angenehm, da er sich sehr für das Team und das Projekt Interessiert hat. Seinen Aufgabenbereich hat er voll und ganz zu unserer Zufriedenheit bearbeitet. Durch seine Erfahrung konnten wir uns auch bei Fragen immer an Ihn wenden. ",
  },
  {
    id: 3,
    refName: "Jessica",
    refPosition: "Team Member",
    refText:
      "Maik hat sich sehr in unserem Projekt engagiert und zugeteilte Aufgaben eigenständig bearbeitet. Mit seinen Vorkenntnissen in Javascript hat er uns gut weiterhelfen können, wenn wir nicht weiter wussten. Ich bin dankbar für seine große hilfsbereitschaft gewesen ",
  },
];

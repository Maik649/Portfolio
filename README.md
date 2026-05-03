# Portfolio – Maik Pankow

[![Live Demo](https://img.shields.io/badge/Live-Demo-blue)](https://github.com/Maik649/Portfolio)
[![GitHub](https://img.shields.io/badge/GitHub-Maik649-181717?logo=github)](https://github.com/Maik649)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Maik%20Pankow-0A66C2?logo=linkedin)](https://www.linkedin.com/in/maik-pankow-6aaba0376/)

Persönliches Portfolio als Frontend Developer – entwickelt mit HTML, CSS (Sass) und Vanilla JavaScript.

---

## Inhalt

- [Über das Projekt](#über-das-projekt)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Projektstruktur](#projektstruktur)
- [Installation & Entwicklung](#installation--entwicklung)
- [Lizenz](#lizenz)

---

## Über das Projekt

Dieses Portfolio stellt mich, Maik Pankow, als Frontend Developer vor. Es enthält Informationen über meine Person, meine Fähigkeiten, abgeschlossene Projekte, Referenzen und ein Kontaktformular. Die Seite ist vollständig auf Deutsch und Englisch verfügbar.

---

## Features

- **Mehrsprachigkeit** – Vollständige DE/EN-Umschaltung über ein eigenes Übersetzungssystem (`translate.js` + `translate.json`)
- **Responsive Design** – Optimiert für Desktop, Tablet und Mobilgeräte inkl. Hamburger-Menü
- **Scroll-Animationen** – Sektionen werden beim Einscrollen sichtbar (CSS-Klassen + JS)
- **Dynamisches Rendering** – Skills, Projekte und Referenzen werden per JavaScript generiert
- **Kontaktformular** – Mit clientseitiger Validierung (`mail_valide.js`) und PHP-Mailer (`mailto.php`)
- **PWA-fähig** – Web-App-Manifest und Favicons in verschiedenen Formaten enthalten

---

## Tech Stack

| Technologie | Einsatz |
|---|---|
| HTML5 | Struktur & Semantik |
| CSS3 / Sass | Styling, Animationen, Responsiveness |
| JavaScript (ES6+) | Interaktivität, DOM-Rendering, Übersetzung |
| PHP | Kontaktformular (serverseitiges Mailing) |
| Git | Versionskontrolle |

**Skills im Portfolio:** Angular · TypeScript · JavaScript · HTML5 · CSS · REST API · Scrum · Git · Supabase · Material Design

---

## Projektstruktur

```
Portfolio/
├── index.html              # Haupt-HTML-Datei
├── script.js               # Globale JS-Initialisierung
├── style.css               # Globales Basis-Styling
├── css/                    # Modulare CSS-Dateien pro Sektion
│   ├── variablen.css       # CSS-Custom-Properties
│   ├── nav.css / nav-respons.css
│   ├── hero.css
│   ├── about-me.css
│   ├── skill.css / skill-respons.css
│   ├── projects.css / projects-respons.css
│   ├── references.css / references-respons.css
│   ├── contact.css
│   └── footer-content.css
├── scripts/                # JavaScript-Module
│   ├── translate.js        # Sprachumschaltung (DE/EN)
│   ├── translate.json      # Übersetzungstexte
│   ├── renderSkills.js     # Skill-Icons dynamisch rendern
│   ├── projects.class.js   # Projekte dynamisch rendern
│   ├── references.js       # Referenzen dynamisch rendern
│   ├── mail_valide.js      # Kontaktformular-Validierung
│   └── mailto.php          # PHP-Mailer
├── assets/
│   ├── img/                # Bilder, Icons, SVGs
│   └── fonts/              # Overpass & Overpass Mono (OFL)
└── subpages/
    ├── legal-notice.html   # Impressum
    └── privacy-policy.html # Datenschutz
```

---

## Installation & Entwicklung

### Voraussetzungen

- [Node.js](https://nodejs.org/) (für Sass-Kompilierung)

### Setup

```bash
# Repository klonen
git clone https://github.com/Maik649/Portfolio.git
cd Portfolio

# Abhängigkeiten installieren
npm install
```

### Sass kompilieren

Das Projekt verwendet [Sass](https://sass-lang.com/) für die CSS-Entwicklung.

```bash
# Einmalig kompilieren
npx sass css/:css/

# Im Watch-Modus (automatische Neu-Kompilierung)
npm run watch
```

### Lokaler Server

Da das Kontaktformular PHP benötigt, empfiehlt sich ein lokaler Server (z. B. [XAMPP](https://www.apachefriends.org/) oder VS Code Live Server für reine Frontend-Entwicklung).

---

## Kontakt

**Maik Pankow**  
📧 [info@maikpankow.de](mailto:info@maikpankow.de)  
🐙 [github.com/Maik649](https://github.com/Maik649)  
💼 [LinkedIn](https://www.linkedin.com/in/maik-pankow-6aaba0376/)

---

## Lizenz

Dieses Projekt steht unter der **ISC-Lizenz** – siehe [LICENSE](LICENSE) für Details.  
Die verwendeten Schriftarten (*Overpass* & *Overpass Mono*) stehen unter der [SIL Open Font License](assets/fonts/SIL%20Open%20Font%20License.txt).
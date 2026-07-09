class PROJECTS {
  /**
    * Creates a project manager for the portfolio cards.
   *
    * @param {Array<Object>} projects The projects to render.
   */
  constructor(projects = []) {
    this.projects = projects;
  }

  /**
    * Renders all projects into the specified container.
   *
    * @param {string} containerId The ID of the target container.
   * @returns {void}
   */
  render(containerId = "project") {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = this.projects
      .map((project) => this.renderCard(project))
      .join("");
  }
  /**
    * Creates the HTML markup for a single project card.
   *
    * @param {Object} project The project object with all display information.
   * @returns {string}
   */
  renderCard(project) {
    const projectTextKey = `projectInfosText${project.id}`;

    return `
      <div class="project" onmouseenter="fadeIn_right(this)" onmouseleave="fadeOut_right(this)">
      <div class="project-content-left">
          <img class="project-image" id="${project.id}" src="${project.img}" alt="${project.title}">
          <img class="project-extra-icon" src="./assets/img/regangel.png" alt="Project icon">
        </div>
          <div class="project-content-right">
            <h2>${project.title}</h2>
            <p class="project-tech" >${project.tech}</p>
            <span data-i18n="${projectTextKey}">${project.text}</span>
              <div class="button-content">
                <a class="--primary-button" href="${project.link}" target="_blank">Github</a>
                <a class="--primary-button" href="${project.link2}" target="_blank">Live</a>
              </div>
          </div>
          <span class="project-id">0${project.id}/03</span>
      </div>
    `;
  }
}

/**
 * Creates the project data and renders the project section.
 *
 * @returns {void}
 */
function renderProject() {
  const projectsData = [
    {
      id: 1,
      img: "./assets/img/El-polo-loco.png",
      title: "El Polo Loco",
      tech: "HTML | CSS | JavaScript",
      text: "El Pollo Loco ist ein kleines Jump-and-Run-Spiel. Sammle Münzen und Flaschen und besiege das Endboss-Chicken.",
      link: "https://github.com/Maik649/El-Polo-Loco",
      link2: "https://elpolooco.maikpankow.de",
    },
    {
      id: 2,
      img: "./assets/img/join photos .svg",
      title: "Join",
      tech: "JavaScript | Firebase",
      text: "Join ist ein Kanban-Tool zur strukturierten Aufgabenplanung im Team. Erstelle Tickets, weise Verantwortlichkeiten zu und behalte Deadlines im Blick.",
      link: "https://github.com/Maik649/join-Privat",
      link2: "https://join.maikpankow.de",
    },
    {
      id: 3,
      img: "./assets/img/trockenanker.png",
      title: "Trocken Anker",
      tech: "HTML | JavaScript ",
      text: "Trocken Anker ist eine Website für Suchthilfe. Sie bietet Informationen, Ressourcen und Unterstützung für Menschen, die mit Suchtproblemen kämpfen.",
      link: "https://github.com/Maik649/Trocken-Anker",
      link2: "https://trockenanker.maikpankow.de",
    },
  ];

  const projects = new PROJECTS(projectsData);
  projects.render("project");
}

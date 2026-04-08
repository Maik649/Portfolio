class PROJECTS {
  constructor(projects = []) {
    this.projects = projects;
  }

  render(containerId = "project") {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = this.projects
      .map((project) => this.renderCard(project))
      .join("");
  }

  renderCard(project) {
    return `
      <div class="project">
        <div class="project-content-left">
          <img onmouseover="fadeIn_right(this)" id="${project.id}" src="${project.img}" alt="${project.title}">
          <img class="project-extra-icon" src="./assets/img/regangel.png" alt="Project icon">
        </div>
        <div id="${project.idright}" class="project-content-right">
          <h2>${project.title}</h2>
          <p class="project-tech" >${project.tech}</p>
          <span data-i18n="projectInfosText">${project.text}</span>
          <div class="button-content">
          <a class="--primary-button" href="${project.link}">Github</a>
          <a class="--primary-button" href="${project.link2}">Live</a>
        </div>
          </div>
      </div>
    `;
  }
}

function renderProject() {
  const projectsData = [
    {
      id: 1,
      idright:2,
      img: "./assets/img/Pollo-loco-photo.svg",
      title: "El Polo Loco",
      tech: "HTML | CSS | JavaScript",
      text: "This App is a Slack Clone App. It revolutionizes team communication and collaboration with its intuitive interface, real-time messaging, and robust channel organization.",
      link: "",
      link2: "",
    },
    {
      id: 2,
      idright:3,
      img: "./assets/img/join photos .svg",
      title: "Join",
      tech: "JavaScript | Firebase",
      text: "",
      link: "",
      link2: "",
    },
    {
      id: 3,
      idright:4,
      img: "./assets/img/daBubble-photo.svg",
      title: "DABubble",
      tech: "Angular | TypeScript",
      text: "",
      link: "",
      link2: "",
    },
    {
      id: 4,
      idight:5,
      img: "./assets/img/portfolio-photo.png",
      title: "Portfolio",
      tech: "Responsive Design",
      text: "",
      link: "",
      link2: "",
    },
  ];

  const projects = new PROJECTS(projectsData);
  projects.render("project");
}

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
          <img src="${project.img}" alt="${project.title}">
        </div>
        <div class="project-content-right">
          <h2>${project.title}</h2>
          <span>${project.tech}</span>
        </div>
      </div>
    `;
  }
}

function renderProject() {
  const projectsData = [
    {
      img: "./assets/img/project1.png",
      title: "El Polo Loco",
      tech: "HTML | CSS | JavaScript",
    },
    {
      img: "./assets/img/project2.png",
      title: "Join",
      tech: "JavaScript | Firebase",
    },
    {
      img: "./assets/img/project3.png",
      title: "DABubble",
      tech: "Angular | TypeScript",
    },
    {
      img: "./assets/img/project4.png",
      title: "Portfolio",
      tech: "Responsive Design",
    },
  ];

  const projects = new PROJECTS(projectsData);
  projects.render("project");
}

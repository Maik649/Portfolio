
/**
 * Initializes the page and starts the main render flows.
 *
 * @returns {Promise<void>}
 */
async function init() {
  await database();
  loadeImage();
  renderProject();
  renderReference();
}

/**
 * Opens or closes the mobile navigation menu.
 *
 * @returns {void}
 */
function mobil_menue() {
  document.getElementById("nav").classList.toggle("is-open");
  document.querySelector(".hamburg").classList.toggle("checked");
}

document.querySelectorAll(".nav_li").forEach((li) => {
  li.addEventListener("click", () => {
    document.querySelectorAll(".nav_li").forEach((el) => el.classList.remove("active"));
    li.classList.add("active");
  });
});

/**
 * Activates the detail view of a project.
 *
 * @param {HTMLElement} currentImg The currently focused project element.
 * @returns {void}
 */
function fadeIn_right(currentImg) {
  const projectCard = currentImg?.closest(".project");
  const allProjects = document.querySelectorAll(".project");

  allProjects.forEach((project) => {
    project.classList.remove("is-active");
    project
      .querySelector(".project-content-right")
      ?.classList.remove("is-visible");
  });

  const rightContent = projectCard?.querySelector(".project-content-right");

  if (projectCard && rightContent) {
    rightContent.classList.add("is-visible");
    projectCard.classList.add("is-active");
  }
}

/**
 * Deactivates the detail view of a project.
 *
 * @param {HTMLElement} currentProject The project element that is being left.
 * @returns {void}
 */
function fadeOut_right(currentProject) {
  const projectCard = currentProject?.closest(".project");
  if (projectCard) {
    projectCard.classList.remove("is-active");
    projectCard.querySelector(".project-content-right") ?.classList.remove("is-visible");
  }
}


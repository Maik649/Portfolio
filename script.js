/*
 *navigation
 */
async function init() {
  await database();
  loadeImage();
  renderProject();
  renderReference();
}

function mobil_menue() {
  document.getElementById("nav").classList.toggle("is-open");
  document.querySelector(".hamburg").classList.toggle("checked");
}

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

function fadeOut_right(currentProject) {
  const projectCard = currentProject?.closest(".project");
  if (projectCard) {
    projectCard.classList.remove("is-active");
    projectCard.querySelector(".project-content-right") ?.classList.remove("is-visible");
  }
}
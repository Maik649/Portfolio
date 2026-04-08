/*   
*navigation 
*/
async function init() {
  await database();
  loadeImage();
  renderProject();
  
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
     project.querySelector(".project-content-right")?.classList.remove("is-visible");
   });

   const rightContent = projectCard?.querySelector(".project-content-right");

   if (projectCard && rightContent) {
     projectCard.classList.add("is-active");
     rightContent.classList.add("is-visible");
   }
 }
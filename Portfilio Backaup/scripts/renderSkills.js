let skills =[]


let skillsImage = [
  {
    img: "./assets/img/icons/18. Icons s3.svg",
    name: "Angular",
  },

  {
    img: "./assets/img/icons/18. Icons s3 (1).svg",
    name: "Type Script",
  },
  {
    img: "./assets/img/icons/18. Icons s3 (2).svg",
    name: "Javascript",
  },
  {
    img: "./assets/img/icons/18. Icons s3 (3).svg",
    name: "HTML 5",
  },
  {
    img: "./assets/img/icons/18. Icons s3 (4).svg",
    name: "Css",
  },
  {
    img: "./assets/img/icons/18. Icons s3 (5).svg",
    name: "Rest API",
  },
  {
    img: "./assets/img/icons/18. Icons s3 (6).svg",
    name: "Scrum",
  },
  {
    img: "./assets/img/icons/18. Icons s3 (7).svg",
    name: "Git",
  },
  {
    img: "./assets/img/icons/18. Icons s3 (8).svg",
    name: "Superbase",
  },
  {
    img: "./assets/img/icons/18. Icons s3 (10).svg",
    name: "Matarial Desingn",
  },
];
/**
 * Loads all skill data into the target container.
 *
 * @returns {void}
 */
function loadeImage() {
   let skillsContent = document.getElementById("skill-icons");
  for (let index = 0; index < skillsImage.length; index++) {
     skills.push(skillsImage[index]);
         skillsContent.innerHTML += renderTemplade(index);
  }
}

/**
 * Creates the HTML markup for a single skill.
 *
 * @param {number} index The position of the skill inside the array.
 * @returns {string}
 */
function renderTemplade(index) {
  return `<div class="skill">
            <img src="${skills[index].img}" alt="${skills[index].name}">
            <span>${skills[index].name}</span>
        </div>`;
}

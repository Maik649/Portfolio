/*   
*navigation 
*/
async function init() {
  await database();
  loadeImage();
}

 function mobil_menue() {
   document.getElementById("nav").classList.toggle("is-open");
   document.querySelector(".hamburg").classList.toggle("checked");
 }



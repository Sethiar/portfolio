// Fonction de retour au top à 70% de la hauter des pages. 

document.addEventListener("scroll", function () {
  const scrollPosition = window.scrollY; // position actuelle
  const pageHeight = document.body.scrollHeight - window.innerHeight; // hauteur totale scrollable
  const button = document.querySelector(".back-to-top");

  if (scrollPosition / pageHeight > 0.7) {
    // plus de 70%
    button.classList.add("show");
  } else {
    button.classList.remove("show");
  }
});
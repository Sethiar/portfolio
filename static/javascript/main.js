
import "movements_navette/movements_navette.js";
import "elements_interface/target_missile.js";
import "elements_interface/message.js"
import "FX/explosions.js";

document.addEventListener("DOMContentLoaded", function () {
  // Fonction pour animer le défilement de l'arrière-plan
  function moveBackgroundDown() {
     const background = document.getElementById("background");

    // Mettez à jour la hauteur de l'animation CSS à chaque redimensionnement de fenêtre
     function updateAnimationHeight() {
      const windowHeight = window.innerHeight;
      background.style.animationDuration = "1s";
      background.style.animationTimingFunction = "linear";
      background.style.animationIterationCount = "infinite";
      background.style.animationPlayState = "running"; // Réinitialisez l'animation
    }


    // Appelez la fonction pour mettre à jour la hauteur de l'animation lors du chargement initial
    updateAnimationHeight();

    // Ajoutez un gestionnaire d'événement pour le redimensionnement de la fenêtre
    window.addEventListener("resize", updateAnimationHeight);
  }

  // Appelez la fonction pour initialiser l'animation de l'arrière-plan
  moveBackgroundDown();
});
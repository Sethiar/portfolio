import "movements_navette/movements_navette.js";
import "elements_interface/target_missile.js";
import "FX/explosions.js";

document.addEventListener("DOMContentLoaded", function () {
  // Code principal restant
});

document.addEventListener("DOMContentLoaded", function () {
  // Fonction pour animer le défilement de l'arrière-plan
  function moveBackgroundDown() {
    const background = document.querySelector(".background");
    const windowHeight = window.innerHeight;

    // Définissez l'animation CSS en fonction de la hauteur de la fenêtre
    document.styleSheets[0].insertRule(`@keyframes moveBackgroundDown {
      0% {
        background-position-y: 0;
      }
      100% {
        background-position-y: ${windowHeight}px;
      }
    }`, 0);

    // Appliquez l'animation à l'élément .background
    background.style.animationName = "moveBackgroundDown";
    background.style.animationDuration = "10s";
    background.style.animationTimingFunction = "linear";
    background.style.animationIterationCount = "infinite";
  }

  // Appelez la fonction pour initialiser l'animation de l'arrière-plan
  moveBackgroundDown();
});

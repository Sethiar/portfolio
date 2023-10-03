// import des fonction nécessaire aux mouvements de la navette, la disparition de la target,
// l'apparition de la photo, les explosions et la conservation des liens de redirection.
import "/movements_navette/movements_navette.js";
import "/elements_interface/target_missile.js";
import "/elements_interface/message.js";
import "/FX/explosions.js";
import { getLocalStorageItem } from '/elements_interface/conservation_liens.js';

// Ecouteur d'événements pou le bouton retour et les liens
document.addEventListener("DOMContentLoaded", function () {
  const retour = document.getElementById('retour_home');
  // Gestionnaire d'événement pour le bouton de retour
  retour.addEventListener('click', function () {
    // Récupération de l'état des liens depuis le stockage local
    const cvLinkUnlocked = getLocalStorageItem("cv-link-unlocked");
    const competencesLinkUnlocked = getLocalStorageItem("competences-link-unlocked");
    const projetsLinkUnlocked = getLocalStorageItem("projets-link-unlocked");

    // Vérification si le lien "cv-link" est débloqué
    if (cvLinkUnlocked === "true") {
     console.log("Afficher le lien CV");
      // Affichage du lien
      document.getElementById("cv-link").style.display = "inline"
    }

    // Vérification si le lien "competences-link" est débloqué
    if (competencesLinkUnlocked === "true") {
     console.log("Afficher le lien competence");
    // Affichage du lien
      document.getElementById("competences-link").style.display = "inline"
    }
    // Vérification si le lien "projets-link" est débloqué
    if (projetsLinkUnlocked === "true") {
     console.log("Afficher le lien Projets");
      // Affichage du lien
      document.getElementById("projets-link").style.display = "inline"
    }
  });

  // Fonction pour animer le défilement de l'arrière-plan
  function moveBackgroundDown() {
    const background = document.getElementById("background");

    // Mise à jour de la hauteur de l'animation CSS à chaque redimensionnement de fenêtre
    function updateAnimationHeight() {
      const windowHeight = window.innerHeight;
      background.style.animationDuration = "1s";
      background.style.animationTimingFunction = "linear";
      background.style.animationIterationCount = "infinite";
      // Réinitialisation de l'animation
      background.style.animationPlayState = "running";
    }

    // Appel de la fonction pour mettre à jour la hauteur de l'animation lors du chargement initial
    updateAnimationHeight();

    // Ajout d'un gestionnaire d'événement pour le redimensionnement de la fenêtre
    window.addEventListener("resize", updateAnimationHeight);
  }

  // Appel de la fonction pour initialiser l'animation de l'arrière-plan
  moveBackgroundDown();
});
// Import du fichier explosions.js
import { afficherExplosion} from '../FX/explosions.js';
// Import des données du stockage local pour récupérer les liens de redirection de la page d'accueil
import { setLocalStorageItem, recupererLiens} from '../elements_interface/conservation_liens.js';

// Attendre que la page soit complètement chargée
document.addEventListener("DOMContentLoaded", function () {
  // Commence avec 0 adtéroïde
  let asteroidCount = 0;
  // Définition du nombre maximal d'astéroïdes sur la page d'accueil
  const maxAsteroids = 12;

  // Fonction créer les astéroïdes
  function createAsteroid(className, linkId) {
    // Vérification de la limite du nombre d'astéroïdes
    if (asteroidCount < maxAsteroids) {
      // Reprend l'élément de la page qui contient les astéroïdes
      const asteroid = document.createElement('div');
      // L'astéroïde a une classe
      asteroid.className = className;

      // Création aléatoire des astéroïdes sur l'horizontale
      const randomX = Math.random() * window.innerWidth;
      asteroid.style.left = randomX + 'px';
      asteroid.style.top = '-20px';
      // Ajout de l'astéroïde créée
      document.body.appendChild(asteroid);
      // Affichage de l'astéroïde
      asteroid.style.display = 'block';

      // Définition de la vitesse de chute
      const fallSpeed = Math.random() * 4 + 2;
      // Création d'une intervalle pour mettre à jour la position verticale de l'astéroïde
      const intervalId = setInterval(() => {
        // Récupération de la position verticale actuelle de l'astéroïde
        const currentTop = parseInt(asteroid.style.top, 10);
        asteroid.style.top = (currentTop + fallSpeed) + 'px';
        // Disparition de l'astéroïde s'il sort de la fenêtre (fonction taille)
        if (currentTop > window.innerHeight) {
          clearInterval(intervalId);
          // Effacement de l'astéroïde
          asteroid.remove();
          // Décompte de l'astéroïde
          asteroidCount--;
        }
        // Détection de la collision et du type d'astéroïde pour débloquer le lien
        detectCollision(asteroid, linkId);
      }, 50);
      // Incrémentation du compteur
      asteroidCount++;
    }
  }
  // Fonction détectant la collision entre missile et astéroïde
  function detectCollision(asteroid, linkId) {
    const missile = document.getElementById("missile");
    const rectAsteroid = asteroid.getBoundingClientRect();
    const rectMissile = missile.getBoundingClientRect();

    if (
    // Récupération des positions pour collisions
      rectMissile.left < rectAsteroid.right &&
      rectMissile.right > rectAsteroid.left &&
      rectMissile.top < rectAsteroid.bottom &&
      rectMissile.bottom > rectAsteroid.top
    ) {
    // Récupération des coordonnées de l'astéroïde
    const asteroidLeft = rectAsteroid.left + window.scrollX; // Ajustez la position horizontale
    const asteroidTop = rectAsteroid.top + window.scrollY; // Ajustez la position verticale

    // Application des coordonnées à l'élément d'explosion
    const explosion = document.getElementById('explosion_asteroid');
    explosion.style.left = asteroidLeft + 'px';
    explosion.style.top = asteroidTop + 'px';

    // Effacement de l'astéroïde
    asteroid.remove();
    // Effacement du missile
    missile.style.display = "none";
    // Affichage de l'explosion
    afficherExplosion(asteroid);
    // Enregistrement du lien débloqué
    setLocalStorageItem(linkId, "true");
    // Affichage du lien débloqué
    document.getElementById(linkId).style.display = "inline";
  }
}
  setInterval(() => {
    // Création d'astéroïde toutes les 5 secondes
    createAsteroid('asteroid1', 'cv-link');
  }, 5000);

  setInterval(() => {
  // Création d'astéroïde toutes les 6 secondes
    createAsteroid('asteroid2', 'projets-link');
  }, 6000);

  setInterval(() => {
  // Création d'astéroïde toutes les 7 secondes
    createAsteroid('asteroid3', 'competences-link');
  }, 7000);

  // Au chargement de la page, récupération et affichage de l'état actuel des liens
  recupererLiens('cv-link');
  recupererLiens('competences-link');
  recupererLiens('projets-link');
});
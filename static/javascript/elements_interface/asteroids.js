
import { afficherExplosion} from '../FX/explosions.js';
import { setLocalStorageItem, recupererLiens} from '../elements_interface/conservation_liens.js';


document.addEventListener("DOMContentLoaded", function () {
  let asteroidCount = 0;
  const maxAsteroids = 12; // Nombre maximal d'astéroïdes


  function createAsteroid(className, linkId) {
    if (asteroidCount < maxAsteroids) { // Vérifie la limite
      const asteroid = document.createElement('div');
      asteroid.className = className;

      const randomX = Math.random() * window.innerWidth;
      asteroid.style.left = randomX + 'px';
      asteroid.style.top = '-20px';
      document.body.appendChild(asteroid);
      asteroid.style.display = 'block';

      const fallSpeed = Math.random() * 4 + 2;
      const intervalId = setInterval(() => {
        const currentTop = parseInt(asteroid.style.top, 10);
        asteroid.style.top = (currentTop + fallSpeed) + 'px';

        if (currentTop > window.innerHeight) {
          clearInterval(intervalId);
          asteroid.remove();
          asteroidCount--;
        }

        detectCollision(asteroid, linkId);
      }, 50);

      asteroidCount++; // Incrémentation du compteur
    }
  }

  function detectCollision(asteroid, linkId) {
    const missile = document.getElementById("missile");
    const rectAsteroid = asteroid.getBoundingClientRect();
    const rectMissile = missile.getBoundingClientRect();

    if (
    // détecter les positions pour collisions
      rectMissile.left < rectAsteroid.right &&
      rectMissile.right > rectAsteroid.left &&
      rectMissile.top < rectAsteroid.bottom &&
      rectMissile.bottom > rectAsteroid.top
    ) {
    // Récupérez les coordonnées de l'astéroïde
    const asteroidLeft = rectAsteroid.left + window.scrollX; // Ajustez la position horizontale
    const asteroidTop = rectAsteroid.top + window.scrollY; // Ajustez la position verticale

    // Appliquez les coordonnées à l'élément d'explosion
    const explosion = document.getElementById('explosion_asteroid');
    explosion.style.left = asteroidLeft + 'px';
    explosion.style.top = asteroidTop + 'px';

    asteroid.remove();
    missile.style.display = "none";
    afficherExplosion(asteroid);
    // Enregistrement du lien débloqué
    setLocalStorageItem(linkId, "true");
    // Affichage du lien débloqué
    document.getElementById(linkId).style.display = "inline";
  }
}
  setInterval(() => {
    createAsteroid('asteroid1', 'cv-link');
  }, 5000);

  setInterval(() => {
    createAsteroid('asteroid2', 'projets-link');
  }, 7000);

  setInterval(() => {
    createAsteroid('asteroid3', 'competences-link');
  }, 6000);

  // Au chargement de la page, récupération dee l'état actuel des liens et les afficher
  recupererLiens('cv-link');
  recupererLiens('competences-link');
  recupererLiens('projets-link');
});
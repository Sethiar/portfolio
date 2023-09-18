
// Fonction pour générer aléatoirement un astéroïde
function generateAsteroid() {
    const asteroid = document.createElement('div');
    asteroid.className = 'asteroid';


    // Position aléatoire en haut de la page
    const randomX = Math.random() * window.innerWidth;
    asteroid.style.left = randomX + 'px';
    asteroid.style.top = '-20px'; // Commence en haut de la page
    document.body.appendChild(asteroid);

    // Animer la chute de l'astéroïde
    const fallSpeed = Math.random() * 4 + 2; // Vitesse de chute aléatoire
    const intervalId = setInterval(() => {
        const currentTop = parseInt(asteroid.style.top, 10);
        asteroid.style.top = (currentTop + fallSpeed) + 'px';

        // Si l'astéroïde atteint le bas de la page, le supprimer
        if (currentTop > window.innerHeight) {
                    clearInterval(intervalId);
                    asteroid.remove();

        }

        // Vérifiez la collision entre l'astéroïde et le missile à chaque mise à jour de position
        detecterCollisionAsteroid(asteroid);
    // Rafraîchissement toutes les 50 ms
    }, 50);
}

// Générez aléatoirement des astéroïdes toutes les quelques secondes
setInterval(generateAsteroid, 6000); // par exemple, toutes les 6 secondes

function detecterCollisionAsteroid(asteroid) {
  const missile = document.getElementById("missile");
  const rectAsteroid = asteroid.getBoundingClientRect();
  const rectMissile = missile.getBoundingClientRect();

  if (
    rectMissile.left < rectAsteroid.right &&
    rectMissile.right > rectAsteroid.left &&
    rectMissile.top < rectAsteroid.bottom &&
    rectMissile.bottom > rectAsteroid.top
  ) {
    // Collision détectée entre l'astéroïde et le missile
    // Supprime l'astéroïde
    asteroid.remove();
    missile.style.display = "none";
  }
}
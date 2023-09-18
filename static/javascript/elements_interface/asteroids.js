
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
    }, 50); // Rafraîchissement toutes les 50 ms
}

// Générez aléatoirement des astéroïdes toutes les quelques secondes
setInterval(generateAsteroid, 6000); // par exemple, toutes les 6 secondes


function isCollision(asteroid, missile) {
    const rectAsteroid = asteroid.getBoundingClientRect();
    const rectMissile = missile.getBoundingClientRect();

    return (
        rectAsteroid.left < rectMissile.right &&
        rectAsteroid.right > rectMissile.left &&
        rectAsteroid.top < rectMissile.bottom &&
        rectAsteroid.bottom > rectMissile.top
    );
}

// Exemple d'utilisation
const asteroid = document.querySelector('.asteroid');
const missile = document.getElementById('missile'); // Assurez-vous d'avoir un élément avec l'id 'missile'

setInterval(() => {
    if (isCollision(asteroid, missile)) {
        console.log('Collision détectée');
        // Supprimez l'astéroïde en cas de collision
        asteroid.remove();
    }
// Vérifiez la collision toutes les 50 ms
}, 50);
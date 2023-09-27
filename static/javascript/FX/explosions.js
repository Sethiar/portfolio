export function afficherExplosion(asteroid) {
  const explosion = document.getElementById('explosion_asteroid');
  // Déclaration des caractéristiques de l'explosion
  const explosionWidth = parseFloat(getComputedStyle(explosion).width);
  const explosionHeight = parseFloat(getComputedStyle(explosion).height);
  const animationExplosionSpeed = 70;
  explosion.style.display = "block";

  let explosionFrameIndex = 0;
  const totalExplosionFrames = 16;

  // Fonction mettant à jour la position de l'image de l'explosion
  function animateExplosion() {
    const explosionSpriteOffset = -explosionFrameIndex * (explosionWidth / 16);

    // Récupérer la position de l'astéroïde
    const asteroidRect = asteroid.getBoundingClientRect();
    const asteroidTop = asteroidRect.top + window.scrollY;
    const asteroidHeight = asteroidRect.height;

    // Calculer la position verticale de l'explosion en fonction de l'astéroïde
    const explosionTop = asteroidTop + asteroidHeight / 2 - explosionHeight / 2;

    explosion.style.backgroundPosition = `${explosionSpriteOffset}px ${explosionTop}px`;

    explosionFrameIndex = (explosionFrameIndex + 1) % totalExplosionFrames;

    if (explosionFrameIndex >= totalExplosionFrames) {
      // Cacher l'explosion si toutes les frames ont été affichées.
      clearInterval(explosionInterval);
      explosion.style.display = "none";
      explosionFrameIndex = 0;
    }
  }

  // Démarrer l'animation de l'explosion
  const explosionInterval = setInterval(animateExplosion, animationExplosionSpeed);

  // Arrêtez l'animation après un certain temps (10 secondes dans cet exemple)
  setTimeout(() => {
    clearInterval(explosionInterval);
    explosion.style.display = "none";
  }, animationExplosionSpeed * totalExplosionFrames); // Masquez l'explosion après la durée de l'animation
}
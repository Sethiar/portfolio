export function afficherExplosion(asteroid) {
  // Récupération de l'élément
  const explosion = document.getElementById('explosion_asteroid');
  // Déclaration des caractéristiques de l'explosion
  const explosionWidth = parseFloat(getComputedStyle(explosion).width);
  const explosionHeight = parseFloat(getComputedStyle(explosion).height);
  // Affichage de l'explosion
  explosion.style.display = "block";
  // Déclaration des données de l'animation de l'explosion
  const animationExplosionSpeed = 70;
  let explosionFrameIndex = 0;
  const totalExplosionFrames = 16;

  // Fonction mettant à jour la position de l'image de l'explosion
  function animateExplosion() {
    const explosionSpriteOffset = -explosionFrameIndex * (explosionWidth / 16);

    // Récupération de la position de l'astéroïde
    const asteroidRect = asteroid.getBoundingClientRect();
    const asteroidTop = asteroidRect.top + window.scrollY;
    const asteroidHeight = asteroidRect.height;

    // Calcul de la position verticale de l'explosion en fonction de l'astéroïde
    const explosionTop = asteroidTop + asteroidHeight / 2 - explosionHeight / 2;
    explosion.style.backgroundPosition = `${explosionSpriteOffset}px ${explosionTop}px`;
    explosionFrameIndex = (explosionFrameIndex + 1) % totalExplosionFrames;

    if (explosionFrameIndex >= totalExplosionFrames) {
      // Toutes les frames ont été affichées.
      clearInterval(explosionInterval);
      explosion.style.display = "none";
      explosionFrameIndex = 0;
    }
  }

  // Affichage de l'animation de l'explosion
  const explosionInterval = setInterval(animateExplosion, animationExplosionSpeed);

  // Arrêt de l'animation après un certain temps
  setTimeout(() => {
    clearInterval(explosionInterval);
    explosion.style.display = "none";
    // Cache l'explosion après la durée de l'animation
  }, animationExplosionSpeed * totalExplosionFrames);
}
export function afficherExplosion() {
  const explosion = document.getElementById('explosion');
  // Déclaration ded caractéristiques de l'explosion
  const explosionWidth = parseFloat(getComputedStyle(explosion).width);
  const explosionHeight = parseFloat(getComputedStyle(explosion).height);
  const animationExplosionSpeed = 70;
  explosion.style.display = "block";

  let explosionFrameIndex = 0;
  const totalExplosionFrames = 8;

  // Fonction mettant à jour la position de l'image de l'explosion
  function animateExplosion() {
    const explosionSpriteOffset = -explosionFrameIndex * (explosionWidth / 8);
    explosion.style.backgroundPosition = `${explosionSpriteOffset}px 0`;
    explosionFrameIndex = (explosionFrameIndex + 1) % totalExplosionFrames;

    if (explosionFrameIndex >= totalExplosionFrames) {
      // Cacher l'explosion si toutes les frames ont été affichées.
      clearInterval(explosionInterval);
      explosion.style.display = "none";
      explosionFrameIndex = 0;
    }
  }

  // Démarrer l'animation de l'explosion
  const explosionInterval = setInterval(animateExplosion, animationExplosionSpeed)

  // Arrêtez l'animation après un certain temps (10 secondes dans cet exemple)
  setTimeout(() => {
    clearInterval(explosionInterval);
    explosion.style.display = "none";
  }, animationExplosionSpeed * totalExplosionFrames); // Masquez l'explosion après la durée de l'animation
}

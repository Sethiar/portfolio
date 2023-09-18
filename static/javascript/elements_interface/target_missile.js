

document.addEventListener("DOMContentLoaded", function () {
// Déclaration de la variable missile
    const missile = document.querySelector(".missile");
    document.addEventListener("DOMContentLoaded", function () {
    let missileFrameIndex = 0;
    const totalMissileFrames = 1;
    const animationMissileSpeed = 65;
    const missileWidth = parseFloat(getComputedStyle(missile).width);
    const missileHeight = parseFloat(getComputedStyle(missile).height);

    let isMissileLaunched = false;
    const missileSpeed = 50;
    let missileInterval;


    // Déclaration du pas du spaceship
  function animateMissile() {
    if (isMissileLaunched) {
      const missileSpriteOffset = -missileFrameIndex * 10;
      missile.style.backgroundPosition = missileSpriteOffset + "px 0";
      missileFrameIndex = (missileFrameIndex + 1) % totalMissileFrames;

      const currentBottom = parseFloat(getComputedStyle(missile).bottom);
      missile.style.bottom = currentBottom + missileSpeed + "px";

      // Appel de la fonction pour détecter la collision
      detecterCollision();

      if (currentBottom > window.innerHeight) {
        missile.style.display = "none";
        isMissileLaunched = false;
        clearInterval(missileInterval);
      }
    }
  }

  function launchMissile() {
    if (!isMissileLaunched) {
      missile.style.left = parseFloat(getComputedStyle(spaceship).left) + "px";
      missile.style.bottom = parseFloat(getComputedStyle(spaceship).bottom) + "px";
      missile.style.display = "block";
      isMissileLaunched = true;
      missileInterval = setInterval(animateMissile, animationMissileSpeed);
    }
  }
 });
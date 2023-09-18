document.addEventListener("DOMContentLoaded", function () {
  // Déclaration de la variable missile
  const missile = document.querySelector(".missile");
  const animationMissileSpeed = 65;
  const missileWidth = parseFloat(getComputedStyle(missile).width);
  const missileHeight = parseFloat(getComputedStyle(missile).height);
  const missileSpeed = 50;

  // Déclaration de la variable spaceship
  const spaceship = document.querySelector(".spaceship");
  // Déclaration du pas du spaceship
  const step = 5;
  const animationSpaceshipSpeed = 125;
  const spaceshipWidth = 144;
  const spaceshipHeight = 52;

  let missileFrameIndex = 0;
  const totalMissileFrames = 1;

  let isMissileLaunched = false;

  let missileInterval;

  function animateMissile() {
    if (isMissileLaunched) {
      const missileSpriteOffset = -missileFrameIndex * 10;
      missile.style.backgroundPosition = `${missileSpriteOffset}px 0`;
      missileFrameIndex = (missileFrameIndex + 1) % totalMissileFrames;

      const currentBottom = parseFloat(getComputedStyle(missile).bottom);
      missile.style.bottom = `${currentBottom + missileSpeed}px`;

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
      missile.style.left = `${parseFloat(getComputedStyle(spaceship).left)}px`;
      missile.style.bottom = `${parseFloat(getComputedStyle(spaceship).bottom)}px`;
      missile.style.display = "block";
      isMissileLaunched = true;
      missileInterval = setInterval(animateMissile, animationMissileSpeed);
    }
  }

  function detecterCollision() {
    const target = document.getElementById("target");
    const missile = document.getElementById("missile");
    const rectTarget = target.getBoundingClientRect();
    const rectMissile = missile.getBoundingClientRect();

    if (
      rectMissile.left < rectTarget.right &&
      rectMissile.right > rectTarget.left &&
      rectMissile.top < rectTarget.bottom &&
      rectMissile.bottom > rectTarget.top
    ) {
      // Collision détectée
      console.log('Collision détectée');
      target.style.display = "none";
      afficherExplosionEtPhoto();
    }
  }

  function afficherExplosionEtPhoto() {
    const photo = document.getElementById("photo");

    // Ajout de la classe pour déclencher l'explosion
    missile.classList.add("explosion");

    // Apparition et animation photo
    photo.style.display = "block";

    // Une fois que l'animation de photo est terminée, afficher le cadre
    photo.addEventListener("animationend", () => {
      cadre.style.display = "block";
      cadre.style.animationPlayState = "running";
    });
  }

  document.addEventListener("keydown", function (event) {
    const key = event.key;

    if (key === "f") {
      launchMissile();
    }
  });
});
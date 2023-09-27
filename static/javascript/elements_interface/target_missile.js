import { afficherMessageAvecAnimation } from './message.js';
import { afficherExplosion } from '../FX/explosions.js';

document.addEventListener("DOMContentLoaded", function () {
  // Déclaration de la variable missile
  const missile = document.getElementById("missile");
  const animationMissileSpeed = 65;
  const missileWidth = 20;
  const missileHeight = 30;
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
    //const explosion = document.getElementById("explosion")
    const target = document.getElementById("target");
    const message = document.getElementById('target-message')
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
      message.style.display = "none"
      missile.style.display = "none";
      afficherPhoto();

      // afficher le message
      afficherMessageAvecAnimation();
    }
  }

  function afficherPhoto() {
    const photo = document.getElementById("photo");
    // Apparition et animation photo
    photo.style.display = "block";
  }

  document.addEventListener("keydown", function (event) {
    const key = event.key;

    if (key === "f") {
      launchMissile();
    }
  });

  // Sélectionnez le bouton "Fire 2" par son ID
  const fireButton2 = document.getElementById("fire2");

  // Ajoutez un gestionnaire d'événements au bouton "Fire 2"
  fireButton2.addEventListener("click", function () {
    launchMissile();
  });
});
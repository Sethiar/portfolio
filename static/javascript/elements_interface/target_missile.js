// Importation de la fonction message.js
import { afficherMessageAvecAnimation } from './message.js';
// Importation de la fonction explosions.js
import { afficherExplosion } from '../FX/explosions.js';

// Attente du chargement complet de la page
document.addEventListener("DOMContentLoaded", function () {
  // Déclaration de la variable missile
  const missile = document.getElementById("missile");
  const animationMissileSpeed = 65;
  const missileWidth = 20;
  const missileHeight = 30;
  const missileSpeed = 50;

  // Déclaration de la variable spaceship
  const spaceship = document.querySelector(".spaceship");
  // Déclaration du pas, vitesse et dimension du spaceship
  const step = 5;
  const animationSpaceshipSpeed = 125;
  const spaceshipWidth = 144;
  const spaceshipHeight = 52;

  // Déclaration de la variable missile
  let missileFrameIndex = 0;
  // Déclaration de l'animation du missile
  const totalMissileFrames = 1;
  // Mise en place d'un contrôle du lancement des missile
  let isMissileLaunched = false;
  // Mise en place d'un interval de shoot des missile
  let missileInterval;

  // Fonction qui anime les missiles
  function animateMissile() {
    // Vérification de l'existence d'un missile déjà lancée
    if (isMissileLaunched) {
      // Mise en animation des missiles
      const missileSpriteOffset = -missileFrameIndex * 10;
      missile.style.backgroundPosition = `${missileSpriteOffset}px 0`;
      missileFrameIndex = (missileFrameIndex + 1) % totalMissileFrames;

      // Récupération de la position basse des missiles
      const currentBottom = parseFloat(getComputedStyle(missile).bottom);
      // Mise à jour position verticale des missiles
      missile.style.bottom = `${currentBottom + missileSpeed}px`;

      // Appel de la fonction pour détecter la collision
      detecterCollision();
      // Si dépassement de la fenêtre effacement du missile
      if (currentBottom > window.innerHeight) {
        missile.style.display = "none";
        // Le missile n'est plus en cours de lancement
        isMissileLaunched = false;
        //Remise à zéro de l'intervalle de temps entre lancement de missiles
        clearInterval(missileInterval);
      }
    }
  }
  // Fonction qui lance les missile
  function launchMissile() {
    // Vérification si ifMissileLaunched est false
    if (!isMissileLaunched) {
      // Définition de la position horizontale du missile + conversion px en chaîne de caractères
      missile.style.left = `${parseFloat(getComputedStyle(spaceship).left)}px`;
      // Définition de la position verticale du missile + conversion px en chaîne de caractères
      missile.style.bottom = `${parseFloat(getComputedStyle(spaceship).bottom)}px`;
      // Affichage du missile
      missile.style.display = "block";
      // La propriété définissant le lancement d'un missile est true
      isMissileLaunched = true;
      // Appel de la fonction animateMissile à intervalles réguliers
      missileInterval = setInterval(animateMissile, animationMissileSpeed);
    }
  }

  function detecterCollision() {
    // Récupération des données de l'élément
    const target = document.getElementById("target");
    const message = document.getElementById('target-message')
    const missile = document.getElementById("missile");
    // Récupération des données de positionnement des éléments target et missile
    const rectTarget = target.getBoundingClientRect();
    const rectMissile = missile.getBoundingClientRect();

    // Conditions pour collision
    if (
      rectMissile.left < rectTarget.right &&
      rectMissile.right > rectTarget.left &&
      rectMissile.top < rectTarget.bottom &&
      rectMissile.bottom > rectTarget.top
    ) {
      // Collision détectée
      console.log('Collision détectée');
      // Suppression de la cible, du message et du missile
      target.style.display = "none";
      message.style.display = "none"
      missile.style.display = "none";
      // Affichage photo
      afficherPhoto();

      // Affichage du message de description
      afficherMessageAvecAnimation();
    }
  }

  function afficherPhoto() {
    // Récupération des données de l'élément
    const photo = document.getElementById("photo");
    // Apparition et animation photo
    photo.style.display = "block";
  }

  // Déclaration d'une écoute d'un événement clavier
  document.addEventListener("keydown", function (event) {
    const key = event.key;

    if (key === "f") {
      launchMissile();
    }
  });

// Options pour petits écrans
  // Sélection du bouton "Fire 2" par son ID
  const fireButton2 = document.getElementById("fire2");

  // Ajout  d'un gestionnaire d'événements au bouton "Fire 2"
  fireButton2.addEventListener("click", function () {
    launchMissile();
  });
});
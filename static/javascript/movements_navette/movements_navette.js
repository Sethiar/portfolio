
//Mise en place d'un écouteur d'événement lorsque le fichier est chargé
document.addEventListener("DOMContentLoaded", function () {
    // Déclaration de la variable spaceship
    const spaceship = document.querySelector(".spaceship");
    // Déclaration de la variable missile
    const missile = document.querySelector(".missile");
    // Déclaration du pas du spaceship
    const step = 5;
    // Intervalle de déplacement (60 FPS)
    const moveInterval = 100 / 60;

  let spaceshipFrameIndex = 0;

  let missileFrameIndex = 0;

  const totalSpaceshipFrames = 3;

  const totalMissileFrames = 1;

  const animationSpaceshipSpeed = 125;

  const animationMissileSpeed = 65;

  const spaceshipWidth = 144;

  const missileWidth = parseFloat(getComputedStyle(missile).width);

  const spaceshipHeight = 52;

  const missileHeight = parseFloat(getComputedStyle(missile).height);

  let isMissileLaunched = false;
  const missileSpeed = 50;
  let missileInterval;

  // Drapeaux pour les touches enfoncées
  const keysPressed = {
    q: false,
    s: false,
    d: false,
    z: false,
    f: false,
  };

  function animateSpaceship() {
    const spaceshipSpriteOffset = -spaceshipFrameIndex * spaceshipWidth / 3;
    spaceship.style.backgroundPosition = spaceshipSpriteOffset + "px 0";
    spaceshipFrameIndex = (spaceshipFrameIndex + 1) % totalSpaceshipFrames;
  }

  function moveSpaceship() {
  const currentLeft = parseFloat(getComputedStyle(spaceship).left) || 0;
  const currentBottom = parseFloat(getComputedStyle(spaceship).bottom) || 0;

  let leftDelta = 0;
  let bottomDelta = 0;

  if (keysPressed.q) leftDelta -= step;
  if (keysPressed.s) bottomDelta -= step;
  if (keysPressed.d) leftDelta += step;
  if (keysPressed.z) bottomDelta += step;

  // Récupére les dimensions de l'écran
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  // Récupére les dimensions de la navette
  const spaceshipWidth = parseFloat(getComputedStyle(spaceship).width);
  const spaceshipHeight = parseFloat(getComputedStyle(spaceship).height);

  // Limite les déplacements pour empêcher la navette de sortir de l'écran
  const newLeft = currentLeft + leftDelta;
  const newBottom = currentBottom + bottomDelta;

  if (newLeft >= 0 && newLeft + spaceshipWidth <= screenWidth) {
    spaceship.style.left = newLeft + "px";
  }

  if (newBottom >= 0 && newBottom + spaceshipHeight <= screenHeight) {
    spaceship.style.bottom = newBottom + "px";
  }
}

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

  setInterval(animateSpaceship, animationSpaceshipSpeed);

  document.addEventListener("keydown", function (event) {
    const key = event.key;

    if (keysPressed.hasOwnProperty(key) && !keysPressed[key]) {
      keysPressed[key] = true;
      moveSpaceship();

      if (key === "d") {
      // Ajout de la classe d'animation lorsque la touche est enfoncée
        spaceship.classList.add("move-right-animation");
      }
      if (key === "q") {
      // Ajout de la classe d'animation lorsque la touche est enfoncée
        spaceship.classList.add("move-left-animation");
      }
    }

    switch (key) {
      case "f":
        launchMissile();
        break;
    }
  });

  document.addEventListener("keyup", function (event) {
    const key = event.key;

    if (keysPressed.hasOwnProperty(key)) {
      keysPressed[key] = false;

      if (key === "d") {
        // Retire la class d'animation lorsque la touche "d" est relâchée
        spaceship.classList.remove("move-right-animation");
        }
      if (key === "q") {
      // Retire la classe d'animation lorsque la touche "q" est relachée
        spaceship.classList.remove("move-left-animation")
      }
    }
  });

  // Déplace la navette à intervalles réguliers tant que la touche est enfoncée
  setInterval(function () {
    if (keysPressed.z || keysPressed.s || keysPressed.q || keysPressed.d) {
      moveSpaceship();
    }
  }, moveInterval);
});


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
        console.log('Collision détectée')
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


document.addEventListener("DOMContentLoaded", function () {
  // Fonction pour animer le défilement de l'arrière-plan
  function moveBackgroundDown() {
    const background = document.querySelector(".background");
    const windowHeight = window.innerHeight;

    // Définissez l'animation CSS en fonction de la hauteur de la fenêtre
    document.styleSheets[0].insertRule(`@keyframes moveBackgroundDown {
        0% {
            background-position-y: 0;
        }
        100% {
            background-position-y: ${windowHeight}px;
        }
    }`, 0);

    // Appliquez l'animation à l'élément .background
    background.style.animationName = "moveBackgroundDown";
    background.style.animationDuration = "10s";
    background.style.animationTimingFunction = "linear";
    background.style.animationIterationCount = "infinite";
  }

  // Appelez la fonction pour initialiser l'animation de l'arrière-plan
  moveBackgroundDown();

});

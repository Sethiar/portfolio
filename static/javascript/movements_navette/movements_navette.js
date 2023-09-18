document.addEventListener("DOMContentLoaded", function () {
  // Déclaration de la variable spaceship
  const spaceship = document.querySelector(".spaceship");
  // Déclaration du pas du spaceship
  const step = 5;
  const animationSpaceshipSpeed = 125;
  const spaceshipWidth = 144;
  const spaceshipHeight = 52;

  // Intervalle de déplacement (60 FPS)
  const moveInterval = 1000 / 60;

  let spaceshipFrameIndex = 0;
  const totalSpaceshipFrames = 3;

  let isMissileLaunched = false;

  // Drapeaux pour les touches enfoncées
  const keysPressed = {
    q: false,
    s: false,
    d: false,
    z: false,
    f: false,
  };

  function animateSpaceship() {
    const spaceshipSpriteOffset = -spaceshipFrameIndex * (spaceshipWidth / 3);
    spaceship.style.backgroundPosition = `${spaceshipSpriteOffset}px 0`;
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

    // Récupère les dimensions de l'écran
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // Limite les déplacements pour empêcher la navette de sortir de l'écran
    const newLeft = currentLeft + leftDelta;
    const newBottom = currentBottom + bottomDelta;

    if (newLeft >= 0 && newLeft + spaceshipWidth <= screenWidth) {
      spaceship.style.left = `${newLeft}px`;
    }

    if (newBottom >= 0 && newBottom + spaceshipHeight <= screenHeight) {
      spaceship.style.bottom = `${newBottom}px`;
    }
  }

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
  });

  document.addEventListener("keyup", function (event) {
    const key = event.key;

    if (keysPressed.hasOwnProperty(key)) {
      keysPressed[key] = false;

      if (key === "d") {
        // Retire la classe d'animation lorsque la touche "d" est relâchée
        spaceship.classList.remove("move-right-animation");
      }
      if (key === "q") {
        // Retire la classe d'animation lorsque la touche "q" est relâchée
        spaceship.classList.remove("move-left-animation");
      }
    }
  });

  // Déplace la navette à intervalles réguliers tant que la touche est enfoncée
  setInterval(function () {
    if (keysPressed.z || keysPressed.s || keysPressed.q || keysPressed.d) {
      moveSpaceship();
    }
  }, moveInterval);

  setInterval(animateSpaceship, animationSpaceshipSpeed);
});





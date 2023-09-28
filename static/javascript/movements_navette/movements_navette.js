
// Déclaration de la variable spaceshipFrameIndex en dehors de la fonction DOMContentLoaded
let spaceshipFrameIndex = 0;

document.addEventListener("DOMContentLoaded", function () {
  // Déclaration des constantes
  const spaceship = document.querySelector(".spaceship");
  const spaceshipWidth = 144;
  const spaceshipHeight = 52;
  const step = 7;
  const animationSpaceshipSpeed = 125;
  const totalSpaceshipFrames = 3;
  const moveInterval = 1000 / 60;

  // Déclaration des drapeaux pour les touches enfoncées
  const keysPressed = {
    q: false,
    s: false,
    d: false,
    z: false,
    f: false,
  };

  // Fonction pour animer la navette
  function animateSpaceship() {
    const spaceshipSpriteOffset = spaceshipFrameIndex * (spaceshipWidth / 3);
    spaceship.style.backgroundPosition = `${spaceshipSpriteOffset}px 0`;
    spaceshipFrameIndex = (spaceshipFrameIndex + 1) % totalSpaceshipFrames;
  }

  // Fonction pour déplacer la navette
  function moveSpaceship() {
    const currentLeft = parseFloat(getComputedStyle(spaceship).left) || 0;
    const currentBottom = parseFloat(getComputedStyle(spaceship).bottom) || 0;

    let leftDelta = 0;
    let bottomDelta = 0;

    if (keysPressed.q) leftDelta -= step;
    if (keysPressed.s) bottomDelta -= step;
    if (keysPressed.d) leftDelta += step;
    if (keysPressed.z) bottomDelta += step;

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const newLeft = currentLeft + leftDelta;
    const newBottom = currentBottom + bottomDelta;

    if (newLeft >= 0 && newLeft <= screenWidth - spaceshipWidth / 5) {
      spaceship.style.left = `${newLeft}px`;
    }

    if (newBottom >= 0 && newBottom + spaceshipHeight <= screenHeight) {
      spaceship.style.bottom = `${newBottom}px`;
    }
  }

  // Gestionnaires d'événements pour les touches enfoncées
  function handleKeyDown(event) {
    const key = event.key;

    if (keysPressed.hasOwnProperty(key) && !keysPressed[key]) {
      keysPressed[key] = true;
      moveSpaceship();

      if (key === "d") {
        spaceship.classList.add("move-right-animation");
      }
      if (key === "q") {
        spaceship.classList.add("move-left-animation");
      }
    }
  }

  // Gestionnaires d'événements pour les touches relâchées
  function handleKeyUp(event) {
    const key = event.key;

    if (keysPressed.hasOwnProperty(key)) {
      keysPressed[key] = false;

      if (key === "d") {
        spaceship.classList.remove("move-right-animation");
      }
      if (key === "q") {
        spaceship.classList.remove("move-left-animation");
      }
    }
  }

  // Écouteurs d'événements pour les touches enfoncées et relâchées
  document.addEventListener("keydown", handleKeyDown);
  document.addEventListener("keyup", handleKeyUp);

  // Gestionnaires d'événements pour les boutons de l'interface mobile
const mobileButtons = {
  top: document.getElementById("top2"),
  left: document.getElementById("left2"),
  right: document.getElementById("right2"),
  bottom: document.getElementById("bottom2"),
};

function handleMobileButtonPress(buttonName) {
  keysPressed[buttonName] = true;
  moveSpaceship();

  // Ajout de la classe d'animation lorsque le bouton est enfoncé
  if (buttonName === "d") {
    spaceship.classList.add("move-right-animation");
  }
  if (buttonName === "q") {
    spaceship.classList.add("move-left-animation");
  }
}

function handleMobileButtonRelease(buttonName) {
  keysPressed[buttonName] = false;

  // Retire la classe d'animation lorsque le bouton est relâché
  if (buttonName === "d") {
    spaceship.classList.remove("move-right-animation");
  }
  if (buttonName === "q") {
    spaceship.classList.remove("move-left-animation");
  }
}

mobileButtons.top.addEventListener("mousedown", () => {
  handleMobileButtonPress("z");
});

mobileButtons.top.addEventListener("mouseup", () => {
  handleMobileButtonRelease("z");
});

mobileButtons.left.addEventListener("mousedown", () => {
  handleMobileButtonPress("q");
});

mobileButtons.left.addEventListener("mouseup", () => {
  handleMobileButtonRelease("q");
});

mobileButtons.right.addEventListener("mousedown", () => {
  handleMobileButtonPress("d");
});

mobileButtons.right.addEventListener("mouseup", () => {
  handleMobileButtonRelease("d");
});

mobileButtons.bottom.addEventListener("mousedown", () => {
  handleMobileButtonPress("s");
});

mobileButtons.bottom.addEventListener("mouseup", () => {
  handleMobileButtonRelease("s");
});

  // Intervalles d'animation et de déplacement
  setInterval(moveSpaceship, moveInterval);
  setInterval(animateSpaceship, animationSpaceshipSpeed);
});
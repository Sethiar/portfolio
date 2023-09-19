document.addEventListener("DOMContentLoaded", function () {
  function createAsteroid(className, linkId) {
    const asteroid = document.createElement('div');
    asteroid.className = className;

    const randomX = Math.random() * window.innerWidth;
    asteroid.style.left = randomX + 'px';
    asteroid.style.top = '-20px';
    document.body.appendChild(asteroid);
    asteroid.style.display = 'block';

    const fallSpeed = Math.random() * 4 + 2;
    const intervalId = setInterval(() => {
      const currentTop = parseInt(asteroid.style.top, 10);
      asteroid.style.top = (currentTop + fallSpeed) + 'px';

      if (currentTop > window.innerHeight) {
        clearInterval(intervalId);
        asteroid.remove();
      }

      detectCollision(asteroid, linkId);
    }, 50);
  }

  function detectCollision(asteroid, linkId) {
    const missile = document.getElementById("missile");
    const rectAsteroid = asteroid.getBoundingClientRect();
    const rectMissile = missile.getBoundingClientRect();

    if (
      rectMissile.left < rectAsteroid.right &&
      rectMissile.right > rectAsteroid.left &&
      rectMissile.top < rectAsteroid.bottom &&
      rectMissile.bottom > rectAsteroid.top
    ) {
      asteroid.remove();
      missile.style.display = "none";
      document.getElementById(linkId).style.display = "inline";
    }
  }

  setInterval(() => {
    createAsteroid('asteroid1', 'cv-link');
  }, 10000);

  setInterval(() => {
    createAsteroid('asteroid2', 'projets-link');
  }, 7000);

  setInterval(() => {
    createAsteroid('asteroid3', 'competences-link');
  }, 6000);
});
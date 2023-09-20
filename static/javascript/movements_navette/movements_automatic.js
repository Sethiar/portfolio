const spaceship = document.querySelector(".spaceship");
const spaceshipWidth = 144;
const spaceshipHeight = 52;
const animationSpeed = 8;

document.addEventListener("DOMContentLoaded", function () {
    let isAutoMoving = false;

    function autoMoveCv() {
        if (!isAutoMoving) {
            isAutoMoving = true;

            // Point d'arrivée (0, fenêtre/2)
            const targetX = 0;
            const targetY = window.innerHeight / 2;

            // Fonction pour déplacer la navette en diagonale
            function moveDiagonal() {
                const currentLeft = parseFloat(getComputedStyle(spaceship).left) || 0;
                const currentTop = parseFloat(getComputedStyle(spaceship).top) || 0;

                // Calculer la direction vers le point d'arrivée
                const dx = targetX - currentLeft;
                const dy = targetY - currentTop;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance > animationSpeed) {
                    // Déplacer la navette en diagonale
                    const angle = Math.atan2(dy, dx);
                    const newX = currentLeft + animationSpeed * Math.cos(angle);
                    const newY = currentTop + animationSpeed * Math.sin(angle);

                    spaceship.style.left = `${newX}px`;
                    spaceship.style.top = `${newY}px`;

                    // Ajouter la classe d'animation lorsque la navette tourne vers la gauche
                    spaceship.classList.add("move-left-animation");

                    requestAnimationFrame(moveDiagonal);
                } else {
                    // Une fois arrivée à la destination, redirigez vers la page "cv"
                    window.location.href = "home/cv";
                }
            }

            // Démarrer le déplacement en diagonale
            moveDiagonal();
        }
    }

    const cvLink = document.getElementById("cv-link");
    cvLink.addEventListener("click", function (event) {
        event.preventDefault();
        autoMoveCv();
    });

    function autoMoveCompetences() {
        if (!isAutoMoving) {
            isAutoMoving = true;

            // Point d'arrivée (xmax, fenêtre/2)
            const targetX = window.innerWidth - spaceshipWidth;
            const targetY = window.innerHeight / 2;

            // Fonction pour déplacer la navette en diagonale
            function moveDiagonal() {
                const currentLeft = parseFloat(getComputedStyle(spaceship).left) || 0;
                const currentTop = parseFloat(getComputedStyle(spaceship).top) || 0;

                // Calculer la direction vers le point d'arrivée
                const dx = targetX - currentLeft;
                const dy = targetY - currentTop;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance > animationSpeed) {
                    // Déplacer la navette en diagonale
                    const angle = Math.atan2(dy, dx);
                    const newX = currentLeft + animationSpeed * Math.cos(angle);
                    const newY = currentTop + animationSpeed * Math.sin(angle);

                    spaceship.style.left = `${newX}px`;
                    spaceship.style.top = `${newY}px`;

                    // Ajouter la classe d'animation lorsque la navette tourne vers la gauche
                    spaceship.classList.add("move-right-animation");

                    requestAnimationFrame(moveDiagonal);
                } else {
                    // Une fois arrivée à la destination, redirigez vers la page "cv"
                    window.location.href = "home/competences";
                }
            }

            // Démarrer le déplacement en diagonale
            moveDiagonal();
        }
    }

    const competencesLink = document.getElementById("competences-link");
    competencesLink.addEventListener("click", function (event) {
        event.preventDefault();
        autoMoveCompetences();
    });

    function autoMoveProjets() {
        if (!isAutoMoving) {
            isAutoMoving = true;

            // Point d'arrivée (xmax, fenêtre/2)
            const targetX = window.innerWidth / 2;
            const targetY = 0;

            // Fonction pour déplacer la navette en diagonale
            function moveDiagonal() {
                const currentLeft = parseFloat(getComputedStyle(spaceship).left) || 0;
                const currentTop = parseFloat(getComputedStyle(spaceship).top) || 0;

                // Calculer la direction vers le point d'arrivée
                const dx = targetX - currentLeft;
                const dy = targetY - currentTop;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance > animationSpeed) {
                    // Déplacer la navette en diagonale
                    const angle = Math.atan2(dy, dx);
                    const newX = currentLeft + animationSpeed * Math.cos(angle);
                    const newY = currentTop + animationSpeed * Math.sin(angle);

                    spaceship.style.left = `${newX}px`;
                    spaceship.style.top = `${newY}px`;

                     // Calculer l'angle en degrés pour déterminer la direction
                const angleDegrees = (angle * 180) / Math.PI;
                if (angleDegrees < 0) {
                    // La navette tourne vers la gauche
                    spaceship.classList.remove("move-right-animation");
                    spaceship.classList.add("move-left-animation");
                } else {
                    // La navette tourne vers la droite
                    spaceship.classList.remove("move-left-animation");
                    spaceship.classList.add("move-right-animation");
                }

                spaceship.style.left = `${newX}px`;
                spaceship.style.top = `${newY}px`;

                requestAnimationFrame(moveDiagonal);
            } else {
                // Une fois arrivée à la destination, redirigez vers la page "projets"
                window.location.href = "home/projets";
            }
        }

        // Démarrer le déplacement en diagonale
        moveDiagonal();
    }
}

const projetsLink = document.getElementById("projets-link");
projetsLink.addEventListener("click", function (event) {
    event.preventDefault();
    autoMoveProjets();
});
});
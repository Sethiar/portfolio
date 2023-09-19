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
                const currentRight = parseFloat(getComputedStyle(spaceship).right) || 0;
                const currentTop = parseFloat(getComputedStyle(spaceship).top) || 0;

                // Calculer la direction vers le point d'arrivée
                const dx = targetX - currentRight;
                const dy = targetY - currentTop;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance > animationSpeed) {
                    // Déplacer la navette en diagonale
                    const angle = Math.atan2(dy, dx);
                    const newX = currentRight + animationSpeed * Math.cos(angle);
                    const newY = currentTop + animationSpeed * Math.sin(angle);

                    spaceship.style.right = `${newX}px`;
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
});
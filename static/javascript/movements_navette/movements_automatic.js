// Déclaration des données de la navette, élément, largeur, hauteur, vitesse d'animation
const spaceship = document.querySelector(".spaceship");
const spaceshipWidth = 144;
const spaceshipHeight = 52;
const animationSpeed = 8;

// Attente du chargement complet de la page
document.addEventListener("DOMContentLoaded", function () {
    // Déclaration de la variable avec valeur false
    let isAutoMoving = false;

    // Fonction qui va déterminer les mouvements automatiques de la navette lorsqu'un lien est sélectionné
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

                // Calcul de la direction vers le point d'arrivée
                const dx = targetX - currentLeft;
                const dy = targetY - currentTop;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance > animationSpeed) {
                    // Déplacement de la navette en diagonale
                    // Calcul de l'angle en radian entre dy et dx
                    const angle = Math.atan2(dy, dx);
                    // Calcul de la nouvelle position horizontale
                    const newX = currentLeft + animationSpeed * Math.cos(angle);
                    // Calcul de la nouvelle position verticale
                    const newY = currentTop + animationSpeed * Math.sin(angle);
                    // Mise à jour des nouvelles propriétés top et left
                    spaceship.style.left = `${newX}px`;
                    spaceship.style.top = `${newY}px`;

                    // Ajout de la classe d'animation lorsque la navette tourne vers la gauche
                    spaceship.classList.add("move-left-animation");

                    requestAnimationFrame(moveDiagonal);
                } else {
                    // Une fois arrivée à la destination, redirigez vers la page "cv"
                    window.location.href = "home/cv_access";
                }
            }
            // Démarrer le déplacement en diagonale
            moveDiagonal();
        }
    }
    // Déclaration de l'élément qui déclenche le déplacement automatique
    const cvLink = document.getElementById("cv-link");
    cvLink.addEventListener("click", function (event) {
        event.preventDefault();
        autoMoveCv();
    });

    // Fonction qui va déterminer les mouvements automatiques de la navette lorsqu'un lien est sélectionné
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

                // Calcul de la direction vers le point d'arrivée
                const dx = targetX - currentLeft;
                const dy = targetY - currentTop;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance > animationSpeed) {
                    // Déplacement de la navette en diagonale
                    // Calcul de l'angle en radian entre dy et dx
                    const angle = Math.atan2(dy, dx);
                    // Calcul de la nouvelle position horizontale
                    const newX = currentLeft + animationSpeed * Math.cos(angle);
                    // Calcul de la nouvelle position verticale
                    const newY = currentTop + animationSpeed * Math.sin(angle);

                    // Mise à jour des nouvelles propriétés top et left
                    spaceship.style.left = `${newX}px`;
                    spaceship.style.top = `${newY}px`;

                    // Ajout de la classe d'animation lorsque la navette tourne vers la gauche
                    spaceship.classList.add("move-right-animation");

                    requestAnimationFrame(moveDiagonal);
                } else {
                    // Une fois arrivée à la destination, redirigez vers la page "cv"
                    window.location.href = "home/competences";
                }
            }
            // Démarrage du déplacement en diagonale
            moveDiagonal();
        }
    }
    // Déclaration de l'élément qui déclenche le déplacement automatique
    const competencesLink = document.getElementById("competences-link");
    competencesLink.addEventListener("click", function (event) {
        event.preventDefault();
        autoMoveCompetences();
    });
    // Fonction qui va déterminer les mouvements automatiques de la navette lorsqu'un lien est sélectionné
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

                // Calcul de la direction vers le point d'arrivée
                const dx = targetX - currentLeft;
                const dy = targetY - currentTop;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance > animationSpeed) {
                    // Déplacement de la navette en diagonale
                    // Calcul de l'angle en radian entre dy et dx
                    const angle = Math.atan2(dy, dx);
                    // Calcul de la nouvelle position horizontale
                    const newX = currentLeft + animationSpeed * Math.cos(angle);
                    // Calcul de la nouvelle position verticale
                    const newY = currentTop + animationSpeed * Math.sin(angle);
                    // Mise à jour des nouvelles propriétés top et left
                    spaceship.style.left = `${newX}px`;
                    spaceship.style.top = `${newY}px`;

                // Calcul de l'angle en degrés pour déterminer la direction
                const angleDegrees = (angle * 180) / Math.PI;
                if (angleDegrees < 0) {
                    // La navette tourne vers la gauche
                    spaceship.classList.remove("move-left-animation");
                    spaceship.classList.add("move-left-animation");
                if (angleDegrees > 0) {
                    // La navette tourne vers la droite
                    spaceship.classList.remove("move-right-animation");
                    spaceship.classList.add("move-right-animation");
                } else {
                   // LA navette
                   spaceship.classList.remove("move-left-animation");
                    spaceship.classList.add("move-left-animation");
                    }
                }


                spaceship.style.left = `${newX}px`;
                spaceship.style.top = `${newY}px`;

                requestAnimationFrame(moveDiagonal);
            } else {
                // Une fois arrivée à la destination, redirigez vers la page "projets"
                window.location.href = "home/projets";
            }
        }

        // Démarrage du déplacement en diagonale
        moveDiagonal();
    }
}
    // Déclaration de l'élément qui déclenche le déplacement automatique
    const projetsLink = document.getElementById("projets-link");
    projetsLink.addEventListener("click", function (event) {
        event.preventDefault();
        autoMoveProjets();
    });
});
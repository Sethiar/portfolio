 import "../movements_navette/movements_navette.js/"


// Déclaration de la variable spaceshipFrameIndex en dehors de la fonction DOMContentLoaded
let spaceshipFrameIndex = 0;

 // Ajoutez des gestionnaires d'événements pour les contrôles tactiles
        const topButton = document.getElementById("top2");
        const leftButton = document.getElementById("left2");
        const rightButton = document.getElementById("right2");
        const bottomButton = document.getElementById("bottom2");
        const fireButton = document.getElementById("fire2");

        topButton.addEventListener("click", () => {
            // Code à exécuter lorsque le bouton du haut est cliqué
            console.log("Bouton du haut cliqué");
            // Vous pouvez ajouter votre logique de jeu ici
        });

        leftButton.addEventListener("click", () => {
            // Code à exécuter lorsque le bouton de gauche est cliqué
            console.log("Bouton de gauche cliqué");
            spaceship.classList.add("move-left-animation");
            spaceship.classList.remove("move-left-animation");
        });

        rightButton.addEventListener("click", () => {
            // Code à exécuter lorsque le bouton de droite est cliqué
            console.log("Bouton de droite cliqué");
            spaceship.classList.add("move-right-animation");
            spaceship.classList.remove("move-right-animation");
        });

        bottomButton.addEventListener("click", () => {
            // Code à exécuter lorsque le bouton du bas est cliqué
            console.log("Bouton du bas cliqué");
        });

        fireButton.addEventListener("click", () => {
            // Code à exécuter lorsque le bouton de tir est cliqué
            console.log("Bouton de tir cliqué");
        });
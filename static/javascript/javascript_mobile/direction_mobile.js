 import "../movements_navette/movements_navette.js/"

// Déclaration de la variable spaceshipFrameIndex
let spaceshipFrameIndex = 0;

// Ajout de gestionnaires d'événements pour les contrôles tactiles
const topButton = document.getElementById("top2");
const leftButton = document.getElementById("left2");
const rightButton = document.getElementById("right2");
const bottomButton = document.getElementById("bottom2");
const fireButton = document.getElementById("fire2");

// Mise en place d'un écouteur d'événement
topButton.addEventListener("click", () => {
    // Vérification si bouton du haut est cliqué
    console.log("Bouton du haut cliqué");
});

// Mise en place d'un écouteur d'événement
leftButton.addEventListener("click", () => {
    // Vérification si bouton de gauche est cliqué
    console.log("Bouton de gauche cliqué");
    // Animation du mouvement de la navette
    spaceship.classList.add("move-left-animation");
    spaceship.classList.remove("move-left-animation");
});

// Mise en place d'un écouteur d'événement
rightButton.addEventListener("click", () => {
    // Vérification si bouton de droite est cliqué
    console.log("Bouton de droite cliqué");
    // Animation du mouvement de la navette
    spaceship.classList.add("move-right-animation");
    spaceship.classList.remove("move-right-animation");
});

// Mise en place d'un écouteur d'événement
bottomButton.addEventListener("click", () => {
    // Vérification si bouton du bas est cliqué
    console.log("Bouton du bas cliqué");
});

// Mise en place d'un écouteur d'événement
fireButton.addEventListener("click", () => {
    // Vérification si bouton de tir est cliqué
    console.log("Bouton de tir cliqué");
});
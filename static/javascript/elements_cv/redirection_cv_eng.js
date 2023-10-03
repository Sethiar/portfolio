
// Attendre que la page soit complètement chargée
document.addEventListener("DOMContentLoaded", function () {

    // Fonction de gestion du clic, de l'appui sur Entrée, et du surlignage
    function handlePlanetInteraction(planet, destination) {
        // Ecoute du clic sur la planète
        planet.addEventListener("click", function () {
            // Redirige vers la destination
            window.location.href = destination;
        });
        // Ecoute de la position du pointer et surlignage des planètes
        planet.addEventListener("mouseover", function () {
            planet.style.boxShadow = "0 0 10px gold";
        });
        // Annule le surlignage quand le pointeur n'est plus sur la planète
        planet.addEventListener("mouseout", function () {
            planet.style.boxShadow = "none";
        });
    }
    // Appel des éléments de la page avec leurs ids respectifs
    const earth = document.getElementById("animated_earth");
    const mars = document.getElementById("animated_mars");
    const planet1 = document.getElementById("planet1");
    const planet2 = document.getElementById("planet2");

    // Appel de la fonction pour chaque planète avec sa destination respective
    handlePlanetInteraction(earth, "/home/cv_eng");
    handlePlanetInteraction(mars, "/home/M1");
    handlePlanetInteraction(planet1, "/home/attestation-reussite");
    handlePlanetInteraction(planet2, "/home/resultats-formation");
});
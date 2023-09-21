document.addEventListener("DOMContentLoaded", function () {
    const spaceship = document.querySelector(".spaceship");

    // Fonction de gestion du clic, de l'appui sur Entrée, et du surlignage
    function handlePlanetInteraction(planet, destination) {
        planet.addEventListener("click", function () {
            window.location.href = destination;
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                const planetRect = planet.getBoundingClientRect();
                const spaceshipRect = spaceship.getBoundingClientRect();

                const spaceshipX = spaceshipRect.left + spaceshipRect.width / 2;
                const spaceshipY = spaceshipRect.top + spaceshipRect.height / 2;

                const planetX = planetRect.left + planetRect.width / 2;
                const planetY = planetRect.top + planetRect.height / 2;

                const distance = Math.sqrt((planetX - spaceshipX) ** 2 + (planetY - spaceshipY) ** 2);

                if (distance <= (planetRect.width / 2)) {
                    window.location.href = destination;
                }
            }
        });

        planet.addEventListener("mouseover", function () {
            planet.style.boxShadow = "0 0 10px gold";
        });

        planet.addEventListener("mouseout", function () {
            planet.style.boxShadow = "none";
        });
    }

    const earth = document.getElementById("animated_earth");
    const mars = document.getElementById("animated_mars");
    const planet1 = document.getElementById("planet1");
    const planet2 = document.getElementById("planet2");

    // Appel de la fonction pour chaque planète avec sa destination respective
    handlePlanetInteraction(earth, "/home/cv");
    handlePlanetInteraction(mars, "/home/M1");
    handlePlanetInteraction(planet1, "/home/attestation-reussite");
    handlePlanetInteraction(planet2, "/home/Resultats-formation");
});
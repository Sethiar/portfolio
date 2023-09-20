document.addEventListener("DOMContentLoaded", function () {
    const earth = document.getElementById("animated_earth");
    const navette = document.getElementById("navette");

    // Fonction pour gérer le clic sur la souris
    earth.addEventListener("click", function () {
        window.location.href = "/home/cv"; // Remplacez par le lien vers le document cv
    });

    // Fonction pour gérer l'appui sur la touche Entrée
    document.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            const earthRect = earth.getBoundingClientRect();
            const navetteRect = navette.getBoundingClientRect();

            // Vérifiez si la souris est positionnée sur la Terre
            if (
                (event.target === earth || event.target === navette) &&
                (
                    (navetteRect.left >= earthRect.left &&
                    navetteRect.right <= earthRect.right &&
                    navetteRect.top >= earthRect.top &&
                    navetteRect.bottom <= earthRect.bottom)
                    ||
                    (event.target === earth)
                )
            ) {
                window.location.href = "/home/cv"; // Redirection vers le document cv
            }
        }
    });
});
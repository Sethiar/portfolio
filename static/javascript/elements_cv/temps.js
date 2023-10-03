// Fonction qui met à jour l'heure de l'API lunaire
function mettreAJourHeure() {
    // Reprend l'élément de la page heure actuelle
    const heureElement = document.getElementById('heure-actuelle');
    // Date actuelle
    const maintenant = new Date();
    // Heure actuelle
    const heure = maintenant.getHours();
    // Minute actuelle
    const minutes = maintenant.getMinutes();
    // Configuration d'affichage de l'heure
    const heureAffichee = `${heure}:${minutes}`;
    // Affiche l'heure sur la page
    heureElement.innerText = heureAffichee;
}

// Mettre à jour l'heure toutes les 10 secondes
setInterval(mettreAJourHeure, 10000);
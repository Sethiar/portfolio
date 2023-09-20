function mettreAJourHeure() {
    const heureElement = document.getElementById('heure-actuelle');
    const maintenant = new Date();
    const heure = maintenant.getHours();
    const minutes = maintenant.getMinutes();
    const heureAffichee = `${heure}:${minutes}`;
    heureElement.innerText = heureAffichee;
}

// Mettre à jour l'heure chaque sminute
setInterval(mettreAJourHeure, 2000);
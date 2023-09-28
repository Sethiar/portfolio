
export function setLocalStorageItem(key, value) {
  localStorage.setItem(key, value);
}

// Fonction pour récupérer les liens depuis le stockage local
export function recupererLiens(key) {
    var lienStocke = localStorage.getItem(key);

    // Vérifiez s'il y a un lien stocké
    if (lienStocke === 'true') {
        // Affiche le lien sur la page d'accueil
        console.log("Lien débloqué depuis le stockage local : " + lienStocke);
        // Affiche le lien en le rendant visible
        document.getElementById('cv-link').style.display = "inline";
        document.getElementById('competences-link').style.display = "inline";
        document.getElementById('projets-link').style.display = "inline";
    }

}
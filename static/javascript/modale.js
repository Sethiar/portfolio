// Fonction pour définir un cookie
function setCookie(name, value, days, secure = true) {
    var expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);

    // Utilisation de la propriété "secure" pour définir si le cookie doit être sécurisé ou non
    var cookieString = name + '=' + value + ';expires=' + expires.toUTCString();
    if (secure) {
        cookieString += ';secure;SameSite=Strict';
    }
    document.cookie = cookieString;
}

// Attente du chargement complet du document
document.addEventListener("DOMContentLoaded", function () {
    var modale = document.getElementById('fenetre_modale');
    var acceptBtn = document.getElementById('acceptBtn');
    var rejectBtn = document.getElementById('rejectBtn');

    // Afficher la modale
    console.log("Modal is displayed");
    modale.style.display = 'block';

    // Gérer les clics sur les boutons
    acceptBtn.addEventListener('click', function() {
        setCookie('cookie_consent', 'accepted', 30);
        sendConsentToServer('accepted');  // Envoie les données au serveur
        modale.style.display = 'none';
        console.log("Accept button clicked");
    });

    rejectBtn.addEventListener('click', function() {
        setCookie('cookie_consent', 'rejected', 30);
        sendConsentToServer('rejected');  // Envoie les données au serveur
        modale.style.display = 'none';
        console.log("refuse button clicked");
    });

    function sendConsentToServer(consent) {
        fetch("/consentement", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ consent: consent })
        })
        .then(response => response.text())
        .then(data => {
            console.log("Response from server:", data);
            window.location.href = data;
        })
        .catch(error => {
            console.error('Erreur lors de l\'envoi des données :', error);
        });
    }
});
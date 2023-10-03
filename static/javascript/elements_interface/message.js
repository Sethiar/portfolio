// Exportation de la fonction affcihant le message sur la page d'accueil
export function afficherMessageAvecAnimation()  {
    // Sélection du container du message
    const messageContainer = document.querySelector('.message-container');
    // Création un nouvel élément <p> pour le message
    const newMessage = document.createElement("p");
    // Affichage du cadre
    messageContainer.style.display = 'block';
    // Définition du contenu du message
    newMessage.textContent = "";
    // Ajout d'un nouveau message au conteneur
    messageContainer.appendChild(newMessage);
    // Application de l'animation
    messageContainer.style.animation = 'appear 10s ease forwards';
  }

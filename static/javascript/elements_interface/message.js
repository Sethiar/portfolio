

export function afficherMessageAvecAnimation()  {
    const messageContainer = document.querySelector('.message-container');

    // Créez un nouvel élément <p> pour le message
    const newMessage = document.createElement("p");

    messageContainer.style.display = 'block'; // Affiche le cadre

    // Définissez le contenu du message
    newMessage.textContent = ""; // Remplacez par votre texte

    // Ajoutez le nouveau message au conteneur
    messageContainer.appendChild(newMessage);

    // Appliquez l'animation
    messageContainer.style.animation = 'appear 10s ease forwards';
  }

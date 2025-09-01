// Menu hamburger pour responsiv

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const header = document.querySelector('.header');
    // Contenu principal 
    const mainContent = document.querySelector('.main-content');

    if (hamburger && header && mainContent) {
      // S'assurer que la marge du contenu principal est correcte au chargement
      if (header.classList.contains('active')) {
        mainContent.style.marginTop = `${header.offsetHeight}px`;
        } else {
        mainContent.style.marginTop = '0';
         }

         // Ajouter un gestionnaire d'événement au clic sur le menu hamburger
        hamburger.addEventListener('click', () => {
         // Toggle les classes actives
         hamburger.classList.toggle('active');
         header.classList.toggle('active');

         // Gère le décalage du contenu principal
         if (header.classList.contains('active')) {
           mainContent.style.marginTop = `${header.offsetHeight}px`;
        } else {
            mainContent.style.marginTop = '0';
         } 
       }
    );
          } else {
           console.error(
             'Un ou plusieurs éléments nécessaires sont manquants : .hamburger, .header, ou .main-content.'
           );
         }
    }
);
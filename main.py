"""
Fichier de configuration de l'application portfolio de Lefetey Arnaud.
"""

import os
import locale
import time

from flask import render_template, send_from_directory

from app import create_app

# Configurer la localisation en français
locale.setlocale(locale.LC_TIME, 'fr_FR.UTF-8')

application = create_app()


#==================================================================#
# Définition des pages particulières de l'application SethiarWorks #
#==================================================================#

# Route renvoyant l'erreur 404.
@application.errorhandler(404)
def page_not_found(error):
    """
    Renvoie une page d'erreur 404 en cas de page non trouvée.
    
    Args:
        error : l'erreur qui a declenché la page non trouvée.
        
    Returns:
        la page d'erreur 404. 
    """ 
    return render_template("error/404.html"), 404


# Route permettant l'affichage de la route de la page d'accueil.
@application.route("/")
def landing_page():
    """
    Page d'accueil du portfolio

    :return: frontend/index.html
    """

    return render_template("frontend/index.html", timestamp=time.time())


# Lancement de l'instance flask.
if __name__ == '__main__':
    application.run(debug=True)


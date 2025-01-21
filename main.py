"""
Fichier de configuration de l'application principal.
"""
import os
import locale
import time

from flask import render_template, send_from_directory

from app import create_app

# Configurer la localisation en français
locale.setlocale(locale.LC_TIME, 'fr_FR.UTF-8')

application = create_app()


# Route permettant l'affichage du favicon.
@application.route('/favicon.ico')
def favicon():
    """
    Sert le fichier favicon.ico à partir du répertoire 'static'.
    """
    return send_from_directory(os.path.join(application.root_path, 'static'),
                               'favicon.ico', mimetype='image/vnd.microsoft.icon')


# Route permettant l'affichage de la route de la page d'accueil.
@application.route("/")
def landing_page():
    """
    Page d'accueil du portfolio

    :return: frontend/accueil_portfolio.html
    """

    return render_template("frontend/accueil_portfolio.html", timestamp=time.time())


# Lancement de l'instance flask.
if __name__ == '__main__':
    application.run(debug=True)


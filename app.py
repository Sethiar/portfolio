"""Fichier app.py contenant toutes les routes de mon portfolio"""

from flask import Flask, render_template, send_from_directory

import os
import locale
import datetime


app = Flask("Portfolio", template_folder="templates")


# Définir la locale en français
locale.setlocale(locale.LC_TIME, 'fr_FR.utf8')


# Route vers la page 404 de mon site
@app.route('/404')
def page404():
    """
Access to 404 page.
    :return:
    """
    return render_template("404.html")

# Ma page d'accueil
@app.route('/')
def home():
    return render_template("home.html")

# Mon curriculum vitae que je présente dans mon portfolio
@app.route('/home/cv_access')
def cv_access():
    # Affichage de la date du jour
    daydate = datetime.datetime.now().strftime('%A %d %B %Y')
    # Affichage de l'heure
    hour = datetime.datetime.now().strftime('%H:%m')

    return render_template("cv.html", hour=hour, daydate=daydate)


@app.route('/home/cv')
def cv():
    return send_from_directory("static/pdf", "CV_arnaud.pdf")


# Les projets personnels que je présente dans mon portfolio
@app.route('/home/projets')
def projet_perso():
    return render_template("projets.html")


# Les compétences que je présente dans mon portfolio
@app.route('/home/competences')
def competences():
    return render_template("competences.html")


port = int(os.environ.get("PORT", 5000))

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=port, debug=True)
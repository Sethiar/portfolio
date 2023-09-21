"""Fichier app.py contenant toutes les routes de mon portfolio"""

from flask import Flask, render_template, send_from_directory, request

import os
import locale
import datetime


app = Flask("Portfolio", template_folder="templates")


# Définir la locale en français
locale.setlocale(locale.LC_TIME, 'fr_FR.utf8')


@app.route("/consentement", methods=["POST"])
def consentement():
    consent_data = request.json
    if consent_data["consent"] == "accepted":
        # Faites ce que vous voulez en cas d'acceptation
        return "/home"

    elif consent_data["consent"] == "rejected":
        # Faites ce que vous voulez en cas de refus
        return "/refus-cookie"

    else:
        # Traitement en cas de données de consentement inconnues ou incorrectes
        return "Données de consentement invalides"


@app.route("/")
def modale():
    return render_template("modale.html")


@app.route("/refus-cookie")
def refus_cookie():
    return render_template("refus-cookie.html")



# Route vers la page 404 de mon site
@app.route('/404')
def page404():
    """
Access to 404 page.
    :return:
    """
    return render_template("404.html")

# Ma page d'accueil
@app.route('/home')
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


@app.route('/home/M1')
def notes_m1():
    return send_from_directory("static/pdf", "Relevé_note_M1.pdf")


@app.route('/home/attestation-reussite')
def attestation_reussite():
    return send_from_directory("static/pdf", "Attestation_de_reussite.pdf")


@app.route('/home/Resultats-formation')
def resultats_formation():
    return send_from_directory("static/pdf", "Resultats_Formation.pdf")


@app.route('/home/projets')
def projet_perso():
    """
Les projets personnels que je présente dans mon portfolio
    :return:
    """
    return render_template("projets.html")


# Les compétences que je présente dans mon portfolio
@app.route('/home/competences')
def competences():
    return render_template("competences.html")


@app.route("/conditions-utilisation")
def condition():
    return render_template("conditions.html")


@app.route("/politique-confidentialité")
def politique():
    return render_template("politique.html")




@app.route("/sitemap.xml")
def sitemap():
    return send_from_directory(".", "sitemap.xml")


@app.route("/robots.txt")
def robots():
    return send_from_directory(".", "robots.txt")




port = int(os.environ.get("PORT", 5000))

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=port, debug=True)
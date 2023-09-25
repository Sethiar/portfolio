"""Fichier app.py contenant toutes les routes de mon portfolio"""

from flask import Flask, render_template, \
    send_from_directory, request, jsonify


import requests

import os
import locale
import datetime


app = Flask("Portfolio")


# Définir la locale en français
locale.setlocale(locale.LC_TIME, 'fr_FR.utf8')


@app.route("/consentement", methods=["POST"])
def consentement():
    """
Route permettant de conner le consentement aux cookies ou non.41
    :return:
    """
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
    """
Route permettant l'affichage de la modale des cookies
    :return:
    """
    return render_template("modale.html")


@app.route("/refus-cookie")
def refus_cookie():
    """
Route renseignant sur les conséquences du refus des cookies.
    :return:
    """
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
    """
Route menant à l'accueil du portfolio
    :return:
    """
    return render_template("home.html")


# Mon curriculum vitae que je présente dans mon portfolio
@app.route('/home/cv_access')
def cv_access():
    """
Route donnant accès à la section personnelle du portfolio
    :return:
    """
    # Obtenir la date et l'heure actuelles
    current_datetime = datetime.datetime.now()

    # Affichage de la date du jour
    current_date = current_datetime.strftime('%A %d %B %Y')

    # Affichage de l'heure
    hour = current_datetime.strftime('%H:%M')

    # Construire l'URL avec la date actuelle
    api_url = f"https://www.icalendar37.net/lunar/api/?lang=fr&month={current_datetime.month}&year={current_datetime.year}&size=100&lightColor=rgb(245,245,245)&shadeColor=rgb(17,17,17)&LDZ={int(current_datetime.timestamp())}"

    response = requests.get(api_url)
    if response.status_code == 200:
        data = response.json()
        return render_template("cv.html", hour=hour, current_date=current_date, moon_data=data)
    else:
        return "Erreur lors de la récupération des données lunaires."


@app.route('/home/cv')
def cv():
    """
Route affichant le curriculum vitae
    :return:
    """

    return send_from_directory("static/pdf", "CV_arnaud.pdf")


@app.route('/home/M1')
def notes_m1():
    """
Route affichant les notes de Master1 Lophisc
    :return:
    """
    return send_from_directory("static/pdf", "Relevé_note_M1.pdf")


@app.route('/home/attestation-reussite')
def attestation_reussite():
    """
Route affichant l'attestation Studi
    :return:
    """
    return send_from_directory("static/pdf", "Attestation_de_reussite.pdf")


@app.route('/home/Resultats-formation')
def resultats_formation():
    """
Route affichant les résultats Studi
    :return:
    """
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
    """
Route permettant d'accéder à mes compétences
    :return:
    """
    return render_template("competences.html")


@app.route("/conditions-utilisation")
def condition():
    """
Route affichant les conditions d'utilisation du site
    :return:
    """
    return render_template("conditions.html")


@app.route("/politique-confidentialité")
def politique():
    """
Rute affichant la politique d'utilisation du site
    :return:
    """
    return render_template("politique.html")


@app.route("/sitemap.xml")
def sitemap():
    """
route permettant l'accès au fichier sitemap.xml
    :return:
    """
    return send_from_directory(".", "sitemap.xml")


@app.route("/robots.txt")
def robots():
    """
route permettant d'accepter ou non les types de robots
    :return:
    """
    return send_from_directory(".", "robots.txt")


port = int(os.environ.get("PORT", 5000))

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=port, debug=True)

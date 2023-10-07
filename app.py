"""Fichier app.py contenant toutes les routes de mon portfolio"""
# -*- coding: utf-8 -*-

from flask import Flask, render_template, send_from_directory,\
    request, abort
from flask_assets import Environment, Bundle

import requests

import datetime


app = Flask("Portfolio", static_url_path='/static')
assets = Environment(app)

# Prise en charge des accents dans les tests avec pytest
app.config['JSON_AS_ASCII'] = False
app.config['TESTING'] = False

# Créer un bundle CSS
css_bundle = Bundle(
    'css/competences.css',
    'css/cv.css',
    'css/footer.css',
    'css/home.css',
    'css/message_titre.css',
    'css/modale.css',
    'css/politique.css',
    'css/projets.css',
    'css/element_interface/drapeaux.css',
    'css/element_interface/target_missile.css',
    'css/element_interface/touches.css',
    'css/navbars/navbars.css',
    'css/navbars/navbars2.css',
    'css/navette/navette.css',
    filters='cssmin',
    output='gen/packed.css'
)

# Créer un bundle JavaScript
js_bundle = Bundle(
    'javascript/main.js',
    'javascript/modale.js',
    'javascript/element_cv/redirection_cv.js',
    'javascript/element_cv/redirection_cv_eng.js',
    'javascript/element_cv/temps.js',
    'javascript/elements_interface/asteroids.js',
    'javascript/elements_interface/conservation_liens.js',
    'javascript/elements_interface/lune.js',
    'javascript/elements_interface/lune_eng.js',
    'javascript/elements_interface/message.js',
    'javascript/elements_interface/target_missile.js',
    'javascript/FX/explosions.js',
    'javascript/javascript_mobile/direction_mobile.js',
    'javascript/movements_navette/movements_automatic.js',
    'javascript/movements_navette/movements_auto_eng.js',
    'javascript/movements_navette/movements_navette.js',
    filters='jsmin',
    output='gen/packed.js'
)

assets.register('css_bundle', css_bundle)
assets.register('js_bundle', js_bundle)


@app.route("/")
def loading_page():
    """
Route permettant l'affichage de la page de chargement
    """
    return render_template("loading_page.html", assets=assets)


@app.route("/fr")
def modale():
    """
Route permettant l'affichage de la modale des cookies
    :return:
        """
    return render_template("modale.html", assets=assets)


@app.route("/eng")
def modale_eng():
    """
Route permettant l'affichage de la modale des cookies en anglais
    :return:
    """
    return render_template("modale_eng.html", assets=assets)


@app.route("/consentement", methods=["POST"])
def consentement():
    """
Route permettant de donner le consentement aux cookies ou non.
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


@app.route("/refus-cookie")
def refus_cookie():
    """
Route renseignant sur les conséquences du refus des cookies.
    :return:
    """
    return render_template("refus-cookie.html", assets=assets)


# Redirection vers la page 404.
@app.errorhandler(404)
def page_not_found(error):
    """
Access to 404 page.
    :return:
    """
    return render_template("error404.html", assets=assets)


# Ma page d'accueil
@app.route('/home')
def home():
    """
Route menant à l'accueil du portfolio
    :return:
    """
    return render_template("home.html", assets=assets)


# Version anglaise : Ma page d'accueil
@app.route('/home_eng')
def home_eng():
    """
    Route menant à la verison anglaise de l'accueil du portfolio
    :return:
    """
    return render_template("homeeng.html", assets=assets)


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
    api_url = "https://www.icalendar37.net/lunar/api/?lang=fr&month={}&year={}&size=100&lightColor=rgb(245,245,245)&shadeColor=rgb(17,17,17)&LDZ={}".format(
        current_datetime.month,
        current_datetime.year,
        int(current_datetime.timestamp())
    )
    response = requests.get(api_url)
    if response.status_code == 200:
        data = response.json()
        return render_template("cv.html", hour=hour, current_date=current_date, moon_data=data, assets=assets)
    else:
        # En cas d'erreur, générer une erreur 500
        abort(500, "Erreur lors de la récupération des données lunaires.")


# Version anglaise : Mon curriculum vitae que je présente dans mon portfolio
@app.route('/home/cv_access_eng')
def cv_access_eng():
    """
Route donnant accès à la version anglaise de la section personnelle du portfolio
    :return:
        """
    # Obtenir la date et l'heure actuelles
    current_datetime = datetime.datetime.now()

    # Affichage de la date du jour
    current_date = current_datetime.strftime('%A %d %B %Y')

    # Affichage de l'heure
    hour = current_datetime.strftime('%H:%M')

    # Construire l'URL avec la date actuelle
    api_url = "https://www.icalendar37.net/lunar/api/?lang=fr&month={}&year={}&size=100&lightColor=rgb(245,245,245)&shadeColor=rgb(17,17,17)&LDZ={}".format(
        current_datetime.month,
        current_datetime.year,
        int(current_datetime.timestamp())
    )
    response = requests.get(api_url)
    if response.status_code == 200:
        data = response.json()
        return render_template("cveng.html", hour=hour, current_date=current_date, moon_data=data, assets=assets)
    else:
        return "Error occurred while retrieving lunar data."


# Présentation de mon cv
@app.route('/home/cv')
def cv():
    """
Route affichant le curriculum vitae
    :return:
    """
    return send_from_directory("static/pdf", "CV_arnaud.pdf")


# Version anglaise : Présentation de mon cv
@app.route('/home/cv_eng')
def cv_eng():
    """
Route affichant le curriculum vitae dans la version anglaise
    :return:
    """
    return send_from_directory("static/pdf", "CV_arnaud_eng.pdf")


# Présentation Notes de M1
@app.route('/home/M1')
def notes_m1():
    """
Route affichant les notes de Master1 Lophisc
    :return:
    """
    return send_from_directory("static/pdf", "Relevé_note_M1.pdf")


# Attestation de réussite
@app.route('/home/attestation-reussite')
def attestation_reussite():
    """
Route affichant l'attestation Studi
    :return:
    """
    return send_from_directory("static/pdf", "Attestation_de_reussite.pdf")


# Résultats de la formation
@app.route('/home/resultats-formation')
def resultats_formation():
    """
Route affichant les résultats Studi
    :return:
    """
    return send_from_directory("static/pdf", "Resultats_Formation.pdf")


# Présentation des projets
@app.route('/home/projets')
def projet_perso():
    """
Les projets personnels que je présente dans mon portfolio
    :return:
    """
    return render_template("projets.html", assets=assets)


# Version anglaise : Présentation des projets
@app.route('/home/projects-section')
def projects_section():
    """
Les projets personnels que je présente dans la version anglaise de mon portfolio
    :return:
    """
    return render_template("projects_section.html", assets=assets)


# Les compétences que je présente dans mon portfolio
@app.route('/home/competences')
def competences():
    """
Route permettant d'accéder à mes compétences
    :return:
    """
    return render_template("competences.html", assets=assets)


# Version anglaise : Les compétences que je présente dans mon portfolio
@app.route('/home/skill-section')
def skill_section():
    """
Route permettant d'accéder à mes compétences
    :return:
    """
    return render_template("skill_section.html", assets=assets)


# Accès aux conditions d'utilisation de mon portfolio
@app.route("/conditions-utilisation")
def condition():
    """
Route affichant les conditions d'utilisation du site
    :return:
    """
    return render_template("conditions.html", assets=assets)


    # Version anglaise : Accès aux conditions d'utilisation de mon portfolio
@app.route("/terms-of-use")
def terms_of_use():
    """
Route affichant les conditions d'utilisation de la version anglaise du site
    :return:
    """
    return render_template("terms_of_use.html", assets=assets)


# Accès à la politique de confidentialité de mon portfolio
@app.route("/politique-confidentialité")
def politique():
    """
Route affichant la politique d'utilisation du site
    :return:
    """
    return render_template("politique.html", assets=assets)


# Version anglaise : Accès à la politique de confidentialité de mon portfolio
@app.route("/privacy-policy")
def privacy_policy():
    """
Route affichant la politique d'utilisation de la version anglaise du site
    :return:
    """
    return render_template("privacy_policy.html", assets=assets)


# Page de remerciements aux contributeurs
@app.route("/remerciements")
def merci():
    """
Route affichant la page de remerciements aux auteurs des œuvres utilisées sur ce site
    :return:
    """
    return render_template("remerciements.html", assets=assets)


# Version anglaise : Page de remerciements aux contributeurs
@app.route("/acknowledgements")
def acknowledgements():
    """
Route affichant la page de remerciements version anglaise aux auteurs des œuvres utilisées pour le site
    :return:
    """
    return render_template("acknowledgements.html", assets=assets)


@app.route("/sitemap.xml")
def sitemap():
    """
Route permettant l'accès au fichier sitemap.xml
    :return:
    """
    return send_from_directory(".", "sitemap.xml")


@app.route("/robots.txt")
def robots():
    """
Route permettant d'accepter ou non les types de robots
    :return:
    """
    return send_from_directory(".", "robots.txt")


@app.route("/static/images_site/images_element/<path:photo1>")
def serve_image(photo1):
    """
Photo pour réseau social twitter
    :param photo1:
    :return:
    """
    return send_from_directory(app.static_folder + "/images_site/images_element/", photo1)

"""
Routes permettant d'afficher les données fonctionnelles du site (politique de confidentialité,
mentions légales, information de l'auteur...)
"""

from flask import render_template

from app.functional import functional_bp


# Route renvoyant les mentions légales.
@functional_bp.route("/mentions-legales")
def mentions():
    """
    Fonction qui renvoie les mentions légales du site.
    :return: functional/mentions.html
    """
    return render_template("functional/mentions.html")


# Route renvoyant les informations de contacts avec la carte de l'entreprise.
@functional_bp.route("/contact")
def contact():
    """
    Accès au contact de l'auteur du portfolio.
    :return: functional/contact.html
    """
    return render_template("functional/contact.html")


from app.frontend import frontend_bp
from flask import render_template

# Route renvoyant la biography.
@frontend_bp.route("/biographie")
def biography():
    """
    Fonction qui renvoie la biographie de l'auteur du portfolio.
    :return: frontend/biographie.html
    """
    return render_template("frontend/biographie.html")
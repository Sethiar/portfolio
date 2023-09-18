"""Fichier app.py contenant toutes les routes de mon portfolio"""

import os
from flask import Flask, render_template


app = Flask("Portfolio", template_folder="templates")

# Route vers la page 404 de mon site
@app.route('/404')
def page404():
    return render_template("404.html")

# Ma page d'accueil
@app.route('/')
def home():
    return render_template("home.html")

# Mon curriculum vitae que je présente dans mon portfolio
@app.route('/home/cv')
def cv():
    return render_template("cv.html")


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
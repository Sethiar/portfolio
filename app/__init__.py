"""
Fichier de configuration de l'application Flask.
"""

import os
import secrets
import logging

import config.config

from datetime import timedelta

from dotenv import load_dotenv
from itsdangerous import URLSafeTimedSerializer

from flask import Flask

from flask_assets import Environment, Bundle
from flask_wtf import CSRFProtect

from config.config import Config

# Chargement des variables d'environnement depuis le fichier .env.
load_dotenv()


# Configuration de l'application flask.
def create_app():
    """
    Configuration de l'application Flask

    :return: le portefolio
    """

    # Création de l'instance de flask.
    app = Flask("Portfolio")

    # Création des routes flask.
    from app.frontend import frontend_bp
    app.register_blueprint(frontend_bp, url_prefix='/frontend')

    from app.functional import functional_bp
    app.register_blueprint(functional_bp, url_prefix='/functional')

    # Configuration de Flask-Assets
    assets = Environment(app)
    css_bundle = Bundle('SCSS/style.scss', output='gen/style.css', filters='scss')
    assets.register('css_all', css_bundle)

    # Rattachement de Flask-Assets à l'instance Flask
    app.assets = assets

    # Empêcher le cache durant le développement
    app.config['ASSETS_DEBUG'] = True

    # Forcer la compilation manuelle
    css_bundle.build()

    # Chargement de la configuration de l'environnement.
    if os.environ.get("FLASK_ENV") == "development":
        app.config.from_object(config.config.DevelopmentConfig)
    elif os.environ.get("FLASK_ENV") == "testing":
        app.config.from_object(config.config.TestingConfig)
    else:
        app.config.from_object(config.config.ProductConfig)

    # configuration de l'environnement de l'application.
    app.config.from_object(Config)

    app.config["SESSION_COOKIE_SECURE"] = True

    # Configuration de la durée de vie des cookies de session.
    app.permanent_session_lifetime = timedelta(days=1)

    # Définition de la clé secrète pour les cookies.
    app.secret_key = secrets.token_hex(16)

    # Configuration du serializer.
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
    app.config['serializer'] = URLSafeTimedSerializer(app.config['SECRET_KEY'])
    app.config['SECRET_PASSWORD_SALT'] = os.getenv('SECURITY_PASSWORD_SALT')

    # Configuration de la protection CSRF
    csrf = CSRFProtect()
    csrf.init_app(app)

    # Configuration de la journalisation.
    logging.basicConfig(level=logging.INFO, format='%(asctime)s %(levelname)s: %(message)s')
    handler = logging.FileHandler("fichier.log")
    handler.setLevel(logging.DEBUG)
    app.logger.addHandler(handler)

    return app

"""
Code pour configuration du portfolio.
"""

import os
from datetime import timedelta


class Config:
    """
    Configuration de base de l'application.

    Classe définissant les paramétrages de la mise en production,
    testing et développement de l'application.
    """

    DEBUG = True
    TESTING = True
    WTF_CSRF_ENABLED = True

    # Clé secrète pour sécuriser les cookies de session.
    SECRET_KEY = os.getenv('SECRET_KEY')

    # Paramètres de sécurité pour cookies de session
    SESSION_COOKIE_SECURE = False
    PERMANENT_SESSION_LIFETIME = timedelta(days=1)


# Configuration de l'environnement de production.
class ProductConfig(Config):
    """
    Configuration de l'environnement de production.

    Cette classe étend la configuraiton de base (Config) et ajuste
    les paramètres spé"cifique à l'environnement de production.
    """
    DEBUG = False

    # Lorsque production.
    SESSION_COOKIE_SECURE = True


# Configuration de l'environnement de développement.
class DevelopmentConfig(Config):
    """
    Configuration de l'environnement de développement.

    Cette classe étend la configuration de base (Config) et ajuste les
    paramètres spécifiques à l'environnement de développement.
    """
    DEVELOPMENT = True
    DEBUG = True


# Configuration de l'environnement de test.
class TestingConfig(Config):
    """
    Configuration de l'environnement de test.

    Cette classe étend la configuration de base (Config) et ajuste les
    paramètres spécifiques à l'environnement de test.
    """
    TESTING = True
    WTF_CSRF_ENABLED = False


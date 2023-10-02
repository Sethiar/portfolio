"""Ce test va vérifier les routes de mon application"""
import os
import sys
import pytest
import requests

# Obtenir le chemin absolu du répertoire courant (où se trouve test_route.py)
current_dir = os.path.dirname(os.path.abspath(__file__))

# Remonter d'un niveau pour inclure le répertoire racine du projet
parent_dir = os.path.dirname(current_dir)
sys.path.append(parent_dir)

from app import create_app_instance

from flask_assets import Environment


@pytest.fixture
def app():
    """
    Définition de mon application en environnement de test
    """

    app_instance = create_app_instance()
    app_instance.config['TESTING'] = True
    return app_instance


def test_create_app():
    app = create_app_instance()
    assert app.config['TESTING'] is True


def test_modale_page(app):
    with app.test_client() as client:
        # Envoi d'une requête GET
        response = client.get('/')
        # Le code de statut de la réponse est 200
        assert response.status_code == 200
        # La réponse renvoie les données attendue
        assert b'LOADING' in response.data


def test_consent_accept(app):
    with app.test_client() as client:
        # Préparation des données JSON pour le test
        consent_data = {'consent': 'accepted'}

        # Envoie d'une requête POST à la route consentement
        response = client.post('/consentement', json=consent_data)

        # Le code de statut de la réponse est 200
        assert response.status_code == 200

        # La réponse renvoie la redirection attendue
        assert response.data == b'/home'


def test_consent_reject(app):
    with app.test_client() as client:
        # Préparation des données JSON pour le test
        consent_data = {'consent': 'rejected'}

        # Envoie d'une requête POST à la route consentement
        response = client.post('/consentement', json=consent_data)

        # Le code de statut de la réponse est 200
        assert response.status_code == 200

        # La réponse renvoie la redirection attendue
        assert response.data == b'/refus-cookie'

def test_modale_page(app):
    with app.test_client() as client:
        # Envoi d'une requête GET
        response = client.get('/fr')
        # Le code de statut de la réponse est 200
        assert response.status_code == 200
        # La réponse renvoie les données attendue
        assert b'Consentement pour les cookies' in response.data

def test_modale_page_eng(app):
    with app.test_client() as client:
        # Envoi d'une requête GET
        response = client.get('/eng')
        # Le code de statut de la réponse est 200
        assert response.status_code == 200
        # La réponse renvoie les données attendue
        assert b'Cookie Consent' in response.data


def test_refus_cookie_page(app):
    # Envoi d'une requête GET
    response = app.test_client().get('/refus-cookie')
    # Le code de statut de la réponse est 200
    assert response.status_code == 200
    # La réponse renvoie les données attendue
    assert b'Avertissement // Disclaimer.' in response.data

def test_404_page(app):
    # Envoi d'une requête GET
    response = app.test_client().get('/404')
    # Le code de statut de la réponse est 200
    assert response.status_code == 200
    # La réponse renvoie les données attendue
    assert b'Erreur 404' in response.data



def test_home_page(app):
    # Envoi d'une requête GET
    response = app.test_client().get('/home')
    # Le code de statut de la réponse est 200
    assert response.status_code == 200
    # La réponse renvoie les données attendue
    assert b'Mon portfolio' in response.data


def test_home_page_eng(app):
    # Envoi d'une requête GET
    response = app.test_client().get('/home_eng')
    # Le code de statut de la réponse est 200
    assert response.status_code == 200
    # La réponse renvoie les données attendue
    assert b'Welcome' in response.data


def test_cv_page(app):
    # Envoi d'une requête GET
    response = app.test_client().get('/home/cv')
    # Le code de statut de la réponse est 200
    assert response.status_code == 200
    # La réponse renvoie les données attendue
    assert response.content_type == 'application/pdf'


def test_cv_page_eng(app):
    # Envoi d'une requête GET
    response = app.test_client().get('/home/cv_eng')
    # Le code de statut de la réponse est 200
    assert response.status_code == 200
    # La réponse renvoie les données attendue
    assert response.content_type == 'application/pdf'


def test_cv_resultat(app):
    # Envoi d'une requête GET
    response = app.test_client().get('/home/resultats-formation')
    # Le code de statut de la réponse est 200
    assert response.status_code == 200
    # La réponse renvoie les données attendue
    assert response.content_type == 'application/pdf'


def test_cv_m1(app):
    # Envoi d'une requête GET
    response = app.test_client().get('/home/M1')
    # Le code de statut de la réponse est 200
    assert response.status_code == 200
    # La réponse renvoie les données attendue
    assert response.content_type == 'application/pdf'


def test_cv_attestation(app):
    # Envoi d'une requête GET
    response = app.test_client().get('/home/attestation-reussite')
    # Le code de statut de la réponse est 200
    assert response.status_code == 200
    # La réponse renvoie les données attendue
    assert response.content_type == 'application/pdf'


# Test de l'API lunaire à préciser
def test_cv_access(app):
    # Définissez l'URL de votre application Flask en fonction de l'hôte et du port où elle s'exécute
    # Par exemple, si votre application s'exécute sur http://localhost:5000 :
    base_url = 'http://localhost:8080'
    endpoint = '/home/cv_access'
    url = f"{base_url}{endpoint}"

    # Effectuez une requête GET vers la route
    response = requests.get(url)

    # La réponse est un succès (code 200)
    assert response.status_code == 200

    # Le type de contenu de la réponse est du JSON
    assert response.headers['Content-Type'] == 'application/json; charset=utf-8'


def test_cv_access_page(app):
    with app.test_client() as client:
        # Envoi d'une requête GET
        response = client.get('/home/cv_access')
        # Le code de statut de la réponse est 200
        assert response.status_code == 200
        # La réponse renvoie les données attendue
        assert b'Date du jour' in response.data


def test_projet_perso_page(app):
    with app.test_client() as client:
        # Envoi d'une requête GET
        response = client.get('/home/projets')
        # Le code de statut de la réponse est 200
        assert response.status_code == 200
        # La réponse renvoie les données attendue
        assert b'Mon projet d\'application pour smartphone "Clean Us Trash"' in response.data


def test_projet_perso_page_eng(app):
    with app.test_client() as client:
        # Envoi d'une requête GET
        response = client.get('/home/projects-section')
        # Le code de statut de la réponse est 200
        assert response.status_code == 200
        # La réponse renvoie les données attendue
        assert b'Creation of an e-commerce website' in response.data


def test_competences_page(app):
    # Envoi d'une requête GET
    response = app.test_client().get('/home/competences')
    # Le code de statut de la réponse est 200
    assert response.status_code == 200
    # La réponse renvoie les données attendue
    assert b'Langages de programmation' in response.data


def test_competences_page_eng(app):
    # Envoi d'une requête GET
    response = app.test_client().get('/home/skill-section')
    # Le code de statut de la réponse est 200
    assert response.status_code == 200
    # La réponse renvoie les données attendue
    assert b'Management software and databases' in response.data


def test_conditions_page(app):
    # Envoi d'une requête GET
    response = app.test_client().get('/conditions-utilisation')
    # Le code de statut de la réponse est 200
    assert response.status_code == 200
    # La réponse renvoie les données attendue
    assert b'Conditions d\'utilisation' in response.data


def test_conditions_page_eng(app):
    # Envoi d'une requête GET
    response = app.test_client().get('/terms-of-use')
    # Le code de statut de la réponse est 200
    assert response.status_code == 200
    # La réponse renvoie les données attendue
    assert b'terms of use' in response.data


def test_politique_page(app):
    # Envoi d'une requête GET
    response = app.test_client().get('/politique-confidentialité')
    # Le code de statut de la réponse est 200
    assert response.status_code == 200
    # La réponse renvoie les données attendue
    assert b'Utilisation des informations' in response.data


def test_politique_page_eng(app):
    # Envoi d'une requête GET
    response = app.test_client().get('/privacy-policy')
    # Le code de statut de la réponse est 200
    assert response.status_code == 200
    # La réponse renvoie les données attendue
    assert b'Privacy Policy' in response.data


def test_remerciements_page(app):
    # Envoi d'une requête GET
    response = app.test_client().get('/remerciements')
    # Le code de statut de la réponse est 200
    assert response.status_code == 200
    # La réponse renvoie les données attendue
    assert b'Remerciements aux contributeurs' in response.data


def test_remerciements_page_eng(app):
    # Envoi d'une requête GET
    response = app.test_client().get('/acknowledgements')
    # Le code de statut de la réponse est 200
    assert response.status_code == 200
    # La réponse renvoie les données attendue
    assert b'Achievements' in response.data


def test_assets_bundles(app):
    assets = Environment(app)
    css_bundle = assets['css_bundle']
    js_bundle = assets['js_bundle']

    assert css_bundle.output == 'gen/packed.css'
    assert js_bundle.output == 'gen/packed.js'

    # Vous pouvez également vérifier les fichiers inclus dans les bundles
    assert 'css/competences.css' in css_bundle.urls()
    assert 'javascript/main.js' in js_bundle.urls()


def test_sitemap_file(app):
    # Envoi d'une requête GET
    response = app.test_client().get('/sitemap.xml')
    # Le code de statut de la réponse est 200
    assert response.status_code == 200
    # La réponse renvoie les données attendue
    assert b'<?xml version="1.0" encoding="utf-8"?>' in response.data.lower()


def test_robots_file(app):
    # Envoi d'une requête GET
    response = app.test_client().get('/robots.txt')
    # Le code de statut de la réponse est 200
    assert response.status_code == 200
    # La réponse renvoie les données attendue
    assert b'User-agent: *' in response.data

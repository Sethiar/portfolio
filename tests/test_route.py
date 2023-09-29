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


from app import create_app


@pytest.fixture
def app():
    """
Définition de mon application en environnement de test
    """
    app = create_app()
    app.config['TESTING'] = True
    client = app.test_client()

    with app.app_context():
        yield client


def test_home_page(app):
    response = app.get('/home')
    assert response.status_code == 200
    assert b'Mon portfolio' in response.data


def test_cv_page(app):
    response = app.get('/home/cv')
    assert response.status_code == 200
    assert response.content_type == 'application/pdf'


def test_cv_resultat(app):
    response = app.get('/home/resultats-formation')
    assert response.status_code == 200
    assert response.content_type == 'application/pdf'


def test_cv_m1(app):
    response = app.get('/home/M1')
    assert response.status_code == 200
    assert response.content_type == 'application/pdf'


def test_cv_attestation(app):
    response = app.get('/home/attestation-reussite')
    assert response.status_code == 200
    assert response.content_type == 'application/pdf'


def test_cv_access(app):
    # Définissez l'URL de votre application Flask en fonction de l'hôte et du port où elle s'exécute
    # Par exemple, si votre application s'exécute sur http://localhost:5000 :
    base_url = 'http://localhost:8080'
    endpoint = '/home/cv_access'
    url = f"{base_url}{endpoint}"

    # Effectuez une requête GET vers la route
    response = requests.get(url)

    # Assurez-vous que la réponse est un succès (code 200)
    assert response.status_code == 200

    # Assurez-vous que le type de contenu de la réponse est du JSON
    assert response.headers['Content-Type'] == 'application/json; charset=utf-8'

"""
Code permettant de gérer les routes du functional.
"""

from flask import Blueprint

functional_bp = Blueprint('functional', __name__)

from app.functional import routes



"""
Code permettant de gérer les routes du frontend.
"""

from flask import Blueprint

frontend_bp = Blueprint('frontend', __name__)

from app.frontend import routes


"""Fichier contenant le code pour la configuration des logging"""

import logging

# Configuration de la gestion des logs
logging.basicConfig(filename='app.log', level=logging.INFO)

# logger personnalisé
logger = logging.getLogger('logger_portfolio')
logger.setLevel(logging.INFO)

# Définition du format du log
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')

# Définition d'un gestionnaire pour enregistrer les logs dans un fichier
handler = logging.FileHandler('app.log')
handler.setLevel(logging.INFO)
handler.setFormatter(formatter)

# Ajout du gestionnaire au logger personnalisé
logger.addHandler(handler)

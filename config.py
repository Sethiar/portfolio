"""Fichier contenant le code pour la configuration des logging"""

import logging

# Configuration de la gestion des logs
logging.basicConfig(filename='app.log', level=logging.INFO)

# Créez un logger personnalisé si vous le souhaitez
# logger = logging.getLogger('mon_logger')
# logger.setLevel(logging.INFO)

# Définissez le format du log
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')

# Créez un gestionnaire pour enregistrer les logs dans un fichier
handler = logging.FileHandler('app.log')
handler.setLevel(logging.INFO)
handler.setFormatter(formatter)

# Ajoutez le gestionnaire au logger personnalisé si vous l'utilisez
# logger.addHandler(handler)

# Exemple d'enregistrement de logs
# logging.info('Ceci est un message de log INFO.')
# logging.error('Ceci est un message de log ERROR.')

# Si vous utilisez un logger personnalisé, utilisez-le pour enregistrer les logs
# logger.info('Ceci est un message de log INFO.')
# logger.error('Ceci est un message de log ERROR.')
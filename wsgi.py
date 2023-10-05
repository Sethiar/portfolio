"""Configuration du serveur waitress"""

import os
from app import create_app_instance

app = create_app_instance()

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8080))
    host = "127.0.0.1"
    app.run(host=host, port=port)

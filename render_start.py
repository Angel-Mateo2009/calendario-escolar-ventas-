"""Entry point for Render: validate production secrets and initialize PostgreSQL."""

import os

from app import app, init_db

if not os.environ.get("DATABASE_URL"):
    raise RuntimeError("Configura DATABASE_URL de PostgreSQL en el servicio web de Render.")
if len(os.environ.get("FLASK_SECRET_KEY", "")) < 32:
    raise RuntimeError("Configura FLASK_SECRET_KEY con al menos 32 caracteres aleatorios en Render.")
if len(os.environ.get("ADMIN_PASSWORD", "")) < 16 or not os.environ.get("ADMIN_EMAILS", "").strip():
    raise RuntimeError("Configura ADMIN_EMAILS y ADMIN_PASSWORD (mínimo 16 caracteres) en Render.")

# With Gunicorn --preload this runs once in the master process, before workers
# fork. init_db() chooses PostgreSQL whenever DATABASE_URL is set; local
# `python app.py` keeps using the existing SQLite startup path.
init_db()

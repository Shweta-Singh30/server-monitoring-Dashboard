from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Initialize database object
db = SQLAlchemy()

def create_app():
    app = Flask(__name__)

    # Set config from env variables
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Initialize extensions
    db.init_app(app)
    CORS(app)

    # Register blueprints
    from .routes.metrics import metrics_bp
    from .routes.servers import servers_bp
    from .routes.alerts import alerts_bp

    app.register_blueprint(metrics_bp, url_prefix="/api/metrics")
    app.register_blueprint(servers_bp, url_prefix="/api/servers")
    app.register_blueprint(alerts_bp, url_prefix="/api/alerts")

    return app

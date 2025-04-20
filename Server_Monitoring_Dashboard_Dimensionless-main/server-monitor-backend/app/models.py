from . import db
from datetime import datetime

class Server(db.Model):
    __tablename__ = 'server'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    ip_address = db.Column(db.String(100), nullable=False)
    status = db.Column(db.String(20), nullable=False)
    location = db.Column(db.String(100))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relationships
    metrics = db.relationship('Metric', backref='server', lazy=True, cascade="all, delete-orphan")
    alerts = db.relationship('Alert', backref='server', lazy=True, cascade="all, delete-orphan")


class Metric(db.Model):
    __tablename__ = 'metric'

    id = db.Column(db.Integer, primary_key=True)
    server_id = db.Column(db.Integer, db.ForeignKey('server.id'), nullable=False)
    cpu = db.Column(db.Float)
    ram = db.Column(db.Float)
    disk = db.Column(db.Float)
    network_in = db.Column(db.Float)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)


class Alert(db.Model):
    __tablename__ = 'alert'

    id = db.Column(db.Integer, primary_key=True)
    server_id = db.Column(db.Integer, db.ForeignKey('server.id'), nullable=False)
    level = db.Column(db.String(20))  # critical, medium, low
    message = db.Column(db.String(200))
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

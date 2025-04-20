from app import create_app, db
from app.models import Server  # or Metric, Alert — whatever you want to query

app = create_app()
with app.app_context():
    data = Server.query.all()
    print(data)

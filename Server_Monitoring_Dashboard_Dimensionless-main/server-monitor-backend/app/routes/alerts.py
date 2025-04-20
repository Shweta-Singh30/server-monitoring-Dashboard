# routes/alerts.py
import os
import requests
from flask import Blueprint, jsonify

alerts_bp = Blueprint('alerts', __name__)

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_API_KEY = os.getenv("SUPABASE_API_KEY")

@alerts_bp.route("/", methods=["GET"])
def get_alerts():
    try:
        url = f"{SUPABASE_URL}/rest/v1/alert"
        headers = {
            "apikey": SUPABASE_API_KEY,
            "Authorization": f"Bearer {SUPABASE_API_KEY}",
        }
        response = requests.get(url, headers=headers)

        if response.status_code == 200:
            return jsonify(response.json())
        else:
            return jsonify({
                "error": "Supabase responded with non-200",
                "status_code": response.status_code,
                "text": response.text
            }), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500

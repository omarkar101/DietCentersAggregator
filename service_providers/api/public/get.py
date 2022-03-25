from flask import Blueprint, jsonify
from database.models.service_providers import ServiceProvider
from database.orm import generate_db_session

public_get_api = Blueprint('public_get_api', __name__, url_prefix='/public/get')

@public_get_api.route('/all', methods=['GET'])
def get_all_service_providers():

  with generate_db_session() as db_session:
    service_providers = db_session.query(ServiceProvider).all()
  return jsonify(success=True, service_providers=service_providers)

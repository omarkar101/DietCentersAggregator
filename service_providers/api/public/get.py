from flask import Blueprint, jsonify, request
from database.models.service_providers import ServiceProvider
from database.orm import generate_db_session

public_get_api = Blueprint('public_get_api', __name__, url_prefix='/public/get')

@public_get_api.route('/all', methods=['GET'])
def get_all_service_providers():

  with generate_db_session() as db_session:
    service_providers = db_session.query(ServiceProvider).all()
  return jsonify(success=True, service_providers=service_providers)

@public_get_api.route('/search', methods=['GET'])
def get_service_providers_by_name():

  serviceProviderName = request.form.get('service_provider_name')
  with generate_db_session() as db_session:
    service_providers = db_session.query(ServiceProvider).filter(ServiceProvider.name == serviceProviderName).all()
    # service_providers = db_session.query(ServiceProvider).filter(ServiceProvider.name.like(serviceProviderName)).all()

  return jsonify(success=True, service_providers=service_providers)

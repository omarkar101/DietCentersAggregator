from flask import Blueprint, jsonify, request
from sqlalchemy.orm import joinedload
from database.models.service_providers import ServiceProvider
from database.orm import generate_db_session

public_get_api = Blueprint('public_get_api', __name__, url_prefix='/public/get')

@public_get_api.route('/all', methods=['GET'])
def get_all_service_providers():

  with generate_db_session() as db_session:
    service_providers = db_session.query(ServiceProvider).all()
  return jsonify(success=True, service_providers=service_providers)

@public_get_api.route('/search', methods=['POST'])
def get_service_providers_by_name():

  serviceProviderName = request.form.get('service_provider_name')
  with generate_db_session() as db_session:
    # service_providers = db_session.query(ServiceProvider).filter(ServiceProvider.name == serviceProviderName).all()
    service_providers = db_session.query(ServiceProvider).all()

  service_providers_copy = [service_provider for service_provider in service_providers if service_provider.name.startswith(serviceProviderName)]

  return jsonify(success=True, service_providers=service_providers_copy)

@public_get_api.route('/by_id', methods=['POST'])
def get_service_provider_by_id():
  service_provider_id = request.form.get('service_provider_id')
  with generate_db_session() as db_session:
    service_provider = db_session.query(ServiceProvider) \
      .filter(ServiceProvider.user_id == service_provider_id) \
      .options(joinedload(ServiceProvider.user)) \
      .first()

  return jsonify(success=True, service_provider=service_provider.as_dict())

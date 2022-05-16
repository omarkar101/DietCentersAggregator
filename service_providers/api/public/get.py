from flask import Blueprint, jsonify, request
from sqlalchemy.orm import joinedload
from database.models.service_providers import ServiceProvider
from database.orm import db_session

public_get_api = Blueprint('public_get_api', __name__, url_prefix='/public/get')

@public_get_api.route('/all', methods=['GET'])
def get_all_service_providers():
  service_providers = db_session.query(ServiceProvider).all()
  return jsonify(success=True, service_providers=[sp.as_dict() for sp in service_providers])

@public_get_api.route('/search', methods=['POST'])
def get_service_providers_by_name():
  serviceProviderName = request.form.get('service_provider_name')
  service_providers = ServiceProvider.query.all()
  return jsonify(success=True, service_providers=[sp.as_dict() for sp in service_providers if sp.name.lower().startswith(serviceProviderName.lower())])

@public_get_api.route('/by_id', methods=['POST'])
def get_service_provider_by_id():
  service_provider_id = request.form.get('service_provider_id')
  service_provider = ServiceProvider.query \
    .filter(ServiceProvider.user_id == service_provider_id) \
    .options(joinedload(ServiceProvider.user)) \
    .first()
  return jsonify(success=True, service_provider=service_provider.as_dict())

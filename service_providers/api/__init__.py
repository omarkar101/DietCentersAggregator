from flask import Blueprint
from service_providers.api.public.get import public_get_api

service_providers_api = Blueprint('service_providers_api', __name__, url_prefix='/service_providers')
service_providers_api.register_blueprint(public_get_api)

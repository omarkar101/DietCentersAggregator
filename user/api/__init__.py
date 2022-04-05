from flask import Blueprint
from user.api.public.update_profile import public_update_api

user_api = Blueprint('user_api', __name__, url_prefix='/user')
user_api.register_blueprint(public_update_api)
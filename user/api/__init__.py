from flask import Blueprint
from user.api.public.update_profile import public_update_api
from user.api.private.add import add_api
from user.api.public.get import public_get_api
from user.api.private.get import private_get_api
from user.api.private.update import private_update_api
from user.api.private.delete import delete_api

user_api = Blueprint('user_api', __name__, url_prefix='/user')
user_api.register_blueprint(public_update_api)
user_api.register_blueprint(add_api)
user_api.register_blueprint(public_get_api)
user_api.register_blueprint(private_get_api)
user_api.register_blueprint(private_update_api)
user_api.register_blueprint(delete_api)

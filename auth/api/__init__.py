from flask import Blueprint
from auth.api.login import login_api
from auth.api.signup import signup_api

auth_api = Blueprint('auth_api', __name__, url_prefix='/auth')
auth_api.register_blueprint(login_api)
auth_api.register_blueprint(signup_api)

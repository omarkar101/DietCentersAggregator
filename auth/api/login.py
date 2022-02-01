from flask import Blueprint, jsonify, request
from credentials.check import check_credentials

login_api = Blueprint('login_api', __name__, url_prefix='/login')

@login_api.route('/user', methods=['POST'])
def user():
    email = request.get_json().get('email')
    password = request.get_json().get('password')
    if check_credentials(email, password):
        return jsonify(success=True)
    return jsonify(success=False, message='Incorrect email or password')

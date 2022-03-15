from flask import Blueprint, jsonify, request, current_app
from credentials.check import check_credentials
import jwt
import datetime

login_api = Blueprint('login_api', __name__, url_prefix='/login')

@login_api.route('/user', methods=['POST'])
def user():
    email = request.form.get('email')
    password = request.form.get('password')
    if check_credentials(email, password):
        token = jwt.encode(
            {'email': email, 'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=30000)},
            current_app.config['SECRET_KEY'])
        return jsonify(success=True, token=token)
    return jsonify(success=False, message='Incorrect email or password')

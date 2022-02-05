from flask import Blueprint, jsonify, request, current_app
from credentials.check import check_credentials
import jwt
import datetime

login_api = Blueprint('login_api', __name__, url_prefix='/login')

@login_api.route('/user', methods=['POST'])
def user():
    email = request.get_json().get('email')
    password = request.get_json().get('password')
    if check_credentials(email, password):
        token = jwt.encode({'email' : email, 'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=30) },current_app.config['SECRET_KEY'])
        return jsonify({'token' : token})
    return jsonify(success=False, message='Incorrect email or password')

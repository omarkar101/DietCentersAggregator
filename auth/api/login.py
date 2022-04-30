from flask import Blueprint, jsonify, request, current_app
from credentials.check import check_credentials
import jwt
import datetime
from database.orm import db_session
from database.models.credentials import Credentials
from sending_emails import sendEmail

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

@login_api.route('/forget_password', methods=['POST'])
def forget_password():
    email = str(request.form.get('email'))
    credentials = Credentials.query.filter(Credentials.email == email).first()
    with db_session.begin():
        pin = credentials.generate_forget_password_pin()
    print(email, pin)
    sendEmail(email, f'this is the pin:{pin}')
    return jsonify(success=True)

@login_api.route('/update_password', methods=['POST'])
def update_password():
    email = str(request.form.get('email'))
    password = str(request.form.get('password'))
    pin = str(request.form.get('pin'))
    print(email)
    credentials = Credentials.query.filter(Credentials.email == email).first()
    print(pin, credentials.forget_password_pin)
    if(pin != credentials.forget_password_pin):
        return jsonify(success=False)
    with db_session.begin():
        credentials.password = password
    return jsonify(success=True)

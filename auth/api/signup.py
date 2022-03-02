import datetime
from flask import Blueprint, current_app, jsonify, request
from flask_cors import cross_origin
import jwt
from sqlalchemy.exc import IntegrityError
from user import UserType
from database.orm import generate_db_session
from database.models.credentials import Credentials
from database.models.clients import Client
from database.models.service_providers import ServiceProvider
from database.models.users import User

signup_api = Blueprint('signup_api', __name__, url_prefix='/signup')

@signup_api.route('/user', methods=['POST'])
@cross_origin(origins='*', supports_credentials=True)
def user():
    email = request.form.get('email')
    password = request.form.get('password')
    phone_number = request.form.get('phone_number')

    try:
        user_type = UserType(request.form.get('user_type'))
        # this must be done in ONE TRANSACTION
        with generate_db_session() as db_session:
            # First, we need to create credentials for the user
            credentials = Credentials(email=email)
            credentials.password = password
            db_session.add(credentials)

            # Second, we need to create a user
            credentials.user = User(phone_number=phone_number)
            credentials.user.user_type = user_type

            # Finally, we need to create the type that the user belongs to
            if user_type == UserType.CLIENT:
                first_name = request.form.get('first_name')
                last_name = request.form.get('last_name')
                credentials.user.client = Client(first_name=first_name, last_name=last_name)
            elif user_type == UserType.SERVICE_PROVIDER:
                name = request.form.get('name')
                credentials.user.service_provider = ServiceProvider(name=name)
            else:
                raise ValueError('Invalid user type')
    except Exception as e:
        return jsonify(success=False, message=e.args[0])
    return jsonify(success=True, token=jwt.encode({'email' : email, 'exp': datetime.datetime.utcnow() 
        + datetime.timedelta(minutes=2000) },current_app.config['SECRET_KEY']))

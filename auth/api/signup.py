from flask import Blueprint, jsonify, request
from sqlalchemy.exc import IntegrityError
from user import UserType
from database.orm import generate_db_session
from database.models.credentials import Credentials
from database.models.clients import Client
from database.models.service_providers import ServiceProvider
from database.models.users import User

signup_api = Blueprint('signup_api', __name__, url_prefix='/signup')

@signup_api.route('/user', methods=['POST'])
def user():
    email = request.get_json().get('email')
    password = request.get_json().get('password')
    phone_number = request.get_json().get('phone_number')

    try:
        user_type = UserType(request.get_json().get('user_type'))
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
                first_name = request.get_json().get('first_name')
                last_name = request.get_json().get('last_name')
                credentials.user.client = Client(first_name=first_name, last_name=last_name)
            elif user_type == UserType.SERVICE_PROVIDER:
                name = request.get_json().get('name')
                credentials.user.service_provider = ServiceProvider(name=name)
            else:
                raise ValueError('Invalid user type')
    except IntegrityError:
        return jsonify(success=False, message=f'Email already registered as {user_type.value}')
    except ValueError as e:
        return jsonify(success=False, message=e.args[0])
    return jsonify(success=True)

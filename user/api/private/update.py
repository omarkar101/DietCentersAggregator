from flask import Blueprint, request, jsonify
from auth.decorators import require_user
from database.orm import db_session
from user import UserType, get_user_id
from database.models.users import User
from database.models.clients_biometrics import ClientBiometrics
from flask_cors import cross_origin

private_update_api = Blueprint('private_update_api', __name__, url_prefix='/update')

@private_update_api.route('/personal_info', methods=['POST'])
@require_user(UserType.SERVICE_PROVIDER)
@cross_origin(origins='*', supports_credentials=True)
def update_user():
    user_id = get_user_id()
    user_name = request.form.get('name')
    user_phone_number = request.form.get('phone_number')
    user_email_address = request.form.get('email_address')
    user = db_session.query(User).filter(User.id == user_id).first()
    if user is None:
        return jsonify(success=False, message='User does not exist')
    with db_session.begin():
        user.service_provider.name = user_name
        user.phone_number = user_phone_number
        user.credentials.email = user_email_address
    return jsonify(success=True, service_provider_personal_info=user.as_dict())

import email
from flask import Blueprint, request, jsonify
from auth.decorators import require_user
from database.orm import generate_db_session
from user import UserType, get_user_id
from database.models.clients import Client
from database.models.users import User
from database.models.addresses import Address
from database.models.clients_biometrics import ClientBiometrics
from sqlalchemy import and_
from flask_cors import CORS, cross_origin

public_update_api = Blueprint('public_update_api', __name__, url_prefix='/public/update')

@public_update_api.route('/personal_info', methods=['POST']) #add address info
@cross_origin(origins='*', supports_credentials=True)
def update_user():
    with generate_db_session() as db_session:
        # user_id = get_user_id()
        user_phone_number = request.form.get('phone_number')
        first_name = request.form.get('first_name')
        last_name = request.form.get('last_name')
        weight = request.form.get('weight')
        height = request.form.get('height')
        age = request.form.get('age')
        address_name = request.form.get('address_name')
        address_email = request.form.get('address_email')
        address_phone_number = request.form.get('address_phone_number')
        address_first_name = request.form.get('address_first_name')
        address_last_name = request.form.get('address_last_name')
        country = request.form.get('country')
        street = request.form.get('street')
        building = request.form.get('building')
        floor = request.form.get('floor')
        instructions = request.form.get('instructions')
        city = request.form.get('city')
        user = db_session.query(User).filter(User.id == 131).first()
        if user is None:
            return jsonify(success=False, message='User does not exist')
        user.client.first_name = first_name
        user.client.last_name = last_name
        user.phone_number = user_phone_number
        if user.client.biometrics is None:
            user.client.biometrics = ClientBiometrics(age=age, weight=weight, height=height)
        else:
            user.client.biometrics.age = age
            user.client.biometrics.height = height
            user.client.biometrics.weight = weight
        if address_name is not None:
            address = Address(
                        address_name=address_name,
                        first_name=address_first_name,
                        last_name=address_last_name,
                        email = address_email,
                        phone_number = address_phone_number,
                        country=country, 
                        street=street, 
                        building=building, 
                        floor=floor, 
                        instructions=instructions,
                        city=city)
            user.addresses.append(address)
    return jsonify(success=True, response_status=200)
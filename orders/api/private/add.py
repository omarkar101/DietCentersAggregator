from flask import Blueprint, request, jsonify
from user import UserType
from auth.decorators import require_user
from database.orm import db_session
from database.models.orders import Order
from flask_cors import cross_origin
add_api = Blueprint('add_api', __name__, url_prefix='/add')

@add_api.route('/send_meal', methods=['POST'])
@require_user(UserType.SERVICE_PROVIDER)
@cross_origin(origins='*', supports_credentials=True)
def send_meal_to_client():
    print('aaa')
    user_id = request.form.get('user_id')
    item_id = request.form.get('item_id')
    with db_session.begin():
        order = Order(user_id=user_id, item_id=item_id)
        db_session.add(order)
    return jsonify(success=True)
        


from flask import Blueprint, request, jsonify
from user import UserType, get_user_id
from auth.decorators import require_user
from database.orm import db_session
from database.models.orders import Order
from sqlalchemy import desc

get_api = Blueprint('get_api', __name__, url_prefix='/get')

@get_api.route('/get_orders', methods=['GET'])
@require_user(UserType.CLIENT)
def get_orders():
    user_id = get_user_id()
    with db_session.begin():
        orders = db_session.query(Order) \
        .filter(Order.user_id == user_id) \
        .order_by(desc(Order.date_sent)) \
        .all()
    orders = [order.as_dict() for order in orders]
    return jsonify(success=True, orders=orders)
        

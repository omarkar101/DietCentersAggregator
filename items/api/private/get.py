from flask import Blueprint, jsonify
from sqlalchemy import asc
from auth.decorators import require_user
from database.models.items import Item
from user import UserType, get_user_id

get_api = Blueprint('get_api', __name__, url_prefix='/get')

@get_api.route('/all', methods=['GET'])
@require_user(UserType.SERVICE_PROVIDER)
def get_all_items():
  # we need to know which user is logged in
  user_id = get_user_id()
  items = Item.query.filter(Item.user_id == user_id).order_by(asc(Item.id)).all()
  return jsonify(success=True, items=[item.as_dict() for item in items])

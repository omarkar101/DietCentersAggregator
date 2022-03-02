from flask import Blueprint, jsonify, request
from auth.decorators import require_user
from database.models.items import Item
from database.orm import generate_db_session
from user import UserType, get_user

add_api = Blueprint('add_api', __name__, url_prefix='/add')

@add_api.route('/', methods=['POST'])
@require_user(UserType.SERVICE_PROVIDER)
def add_item():
  # we need to know which user is logged in
  # user = get_user()
  # items = user.service_provider.items
  item_name = request.get_json().get('item_name')
  item_description = request.get_json().get('item_description')
  with generate_db_session() as db_session:
    # we should associate the items to the current user
    item = Item(name=item_name, description=item_description)
    db_session.add(item)
    # we should only get the current user's items
    items = db_session.query(Item).all()
  return jsonify(success=True, items=items)

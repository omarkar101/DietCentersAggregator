from flask import Blueprint, jsonify, request
from auth.decorators import require_user
from sqlalchemy.orm import joinedload
from database.models.credentials import Credentials
from database.models.items import Item
from database.models.users import User
from database.orm import generate_db_session
from user import UserType, get_user

add_api = Blueprint('add_api', __name__, url_prefix='/add')

@add_api.route('/one', methods=['POST'])
# @require_user(UserType.SERVICE_PROVIDER)
def add_item():
  # we need to know which user is logged in
  # user = get_user()
  # for now we will use test user
  with generate_db_session() as db_session:
    user = db_session.query(Credentials) \
      .options(joinedload(Credentials.user).options(
        joinedload(User.service_provider)
      )) \
      .filter(Credentials.email == 'test@gmail.com') \
      .first()
    user = user.user
    # items = user.service_provider.items
    item_name = request.get_json().get('item_name')
    item_description = request.get_json().get('item_description')
    category = request.get_json().get('category')
    # we should associate the items to the current user
    item = Item(name=item_name, description=item_description, category=category)
    user.service_provider.items.append(item)
  return jsonify(success=True, items=user.service_provider.items)

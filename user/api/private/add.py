from flask import Blueprint, jsonify, request
from flask_cors import CORS, cross_origin
from auth.decorators import require_user
from sqlalchemy.orm import joinedload
from database.models.credentials import Credentials
from database.models.items import Item
from database.models.service_providers import ServiceProvider
from database.models.users import User
from database.orm import generate_db_session
from user import UserType, get_user_id

add_api = Blueprint('add_api', __name__, url_prefix='/add')

@add_api.route('/one', methods=['POST'])
@require_user(UserType.CLIENT)
@cross_origin(origins='*', supports_credentials=True)
def add_package_to_checkout():
  # we need to know which client is logged in
  user_id = get_user_id()
  with generate_db_session() as db_session:
    user = db_session.query(User) \
      .filter(User.id == user_id) \
      .options(joinedload(
        User.client).options(
          joinedload(Client.))) \
      .first()
    item_name = request.form.get('item_name')
    item_description = request.form.get('item_description')
    category = request.form.get('category')
    # we should associate the items to the current user
    item = Item(name=item_name, description=item_description, category=category)
    user.service_provider.items.append(item)
    db_session.refresh(user)
  return jsonify(success=True, items=user.service_provider.items)

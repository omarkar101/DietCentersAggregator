from flask import Blueprint, jsonify, request
from flask_cors import cross_origin
from sqlalchemy import true
from auth.decorators import require_user
from sqlalchemy.orm import joinedload
from database.models.items import Item
from database.models.service_providers import ServiceProvider
from database.models.users import User
from database.orm import db_session
from user import UserType, get_user_id

add_api = Blueprint('add_api', __name__, url_prefix='/add')

@add_api.route('/one', methods=['POST'])
@require_user(UserType.SERVICE_PROVIDER)
@cross_origin(origins='*', supports_credentials=True)
def add_item():
  # we need to know which user is logged in
  user_id = get_user_id()
  # for now we will use test user
  user = db_session.query(User) \
    .filter(User.id == user_id) \
    .options(joinedload(
      User.service_provider).options(
        joinedload(ServiceProvider.items))) \
    .first()
  item_name = request.form.get('item_name')
  item_description = request.form.get('item_description')
  category = request.form.get('category')
  item = Item(name=item_name, description=item_description, category=category, isavailable=True)
  with db_session.begin():
    # we should associate the items to the current user
    user.service_provider.items.append(item)
  db_session.refresh(user)
  items = user.service_provider.items
  return jsonify(success=True, items=sorted([item.as_dict() for item in items], key=lambda x: x['id']))

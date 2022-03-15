from flask import Blueprint, jsonify, request
from flask_cors import CORS, cross_origin
from sqlalchemy import and_
from auth.decorators import require_user
from sqlalchemy.orm import joinedload
from database.models.credentials import Credentials
from database.models.items import Item
from database.models.service_providers import ServiceProvider
from database.models.users import User
from database.orm import generate_db_session
from user import UserType, get_user

edit_api = Blueprint('edit_api', __name__, url_prefix='/edit')

@edit_api.route('/one', methods=['POST'])
@cross_origin(origins='*', supports_credentials=True)
def edit_item():
  # we need to know which user is logged in
  # user = get_user()
  # for now we will use test user
  with generate_db_session() as db_session:
    user = db_session.query(Credentials) \
      .options(joinedload(Credentials.user).options(
        joinedload(User.service_provider).options(
          joinedload(ServiceProvider.items))
      )) \
      .filter(Credentials.email == 'test@gmail.com') \
      .first()
    user = user.user
    item_id = request.form.get('item_id')
    item_name = request.form.get('item_name')
    item_description = request.form.get('item_description')
    item_category = request.form.get('item_category')
    item = db_session.query(Item).filter(and_(Item.user_id == user.id, Item.id == item_id)).first()
    if item is None:
      return jsonify(success=False, message='Item does not exist')
    item.name = item_name
    item.description = item_description
    item.category = item_category
    db_session.refresh(user)
  return jsonify(success=True, items=user.service_provider.items)

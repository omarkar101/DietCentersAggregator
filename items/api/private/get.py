from flask import Blueprint, jsonify, request
from sqlalchemy import asc
from auth.decorators import require_user
from database.models.items import Item
from user import UserType, get_user_id
from database.orm import db_session
from database.models.clients import Client
from database.models.items import Item

get_api = Blueprint('get_api', __name__, url_prefix='/get')

@get_api.route('/all', methods=['GET'])
@require_user(UserType.SERVICE_PROVIDER)
def get_all_items():
  # we need to know which user is logged in
  user_id = get_user_id()
  items = Item.query.filter(Item.user_id == user_id).order_by(asc(Item.id)).all()
  return jsonify(success=True, items=[item.as_dict() for item in items])

@get_api.route('/client_preferred_meal', methods=['POST'])
@require_user(UserType.SERVICE_PROVIDER)
def get_client_preferred_meal():
  user_id = request.form.get('user_id')
  print('user_id ' + str(user_id))
  with db_session.begin():
    client = db_session.query(Client) \
        .filter(Client.user_id == user_id) \
        .first()
    preferred_meal_id = client.preferred_meal
    preferred_item = db_session.query(Item) \
        .filter(Item.id == preferred_meal_id) \
        .first()
    if preferred_item is None:
      return jsonify(success=True, preferred_item=preferred_item)
    return jsonify(success=True, preferred_item=preferred_item.as_dict())
  

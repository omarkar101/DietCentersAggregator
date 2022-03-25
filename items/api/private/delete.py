from flask import Blueprint, jsonify, request
from flask_cors import cross_origin
from sqlalchemy import and_
from database.models.credentials import Credentials
from database.models.items import Item
from database.models.service_providers import ServiceProvider
from database.models.users import User
from sqlalchemy.orm import joinedload
from database.orm import generate_db_session
from user import get_user_id

delete_api = Blueprint('delete_api', __name__, url_prefix='/delete')

@delete_api.route('/one', methods=['POST'])
@cross_origin(origins='*', supports_credentials=True)
def delete_item():
  # we need to know which user is logged in
  user_id = get_user_id()
  # for now we will use test user
  with generate_db_session() as db_session:
    item_id = int(request.form.get('item_id'))
    db_session.query(Item).filter(and_(Item.user_id == user_id, Item.id == item_id)).delete()
    items = db_session.query(Item).filter(Item.user_id == user_id).all()
  return jsonify(success=True, items=items)

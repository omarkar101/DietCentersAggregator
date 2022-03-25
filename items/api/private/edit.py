from flask import Blueprint, jsonify, request
from flask_cors import cross_origin
from sqlalchemy import and_
from auth.decorators import require_user
from database.models.items import Item
from database.orm import generate_db_session
from user import UserType, get_user_id

edit_api = Blueprint('edit_api', __name__, url_prefix='/edit')

@edit_api.route('/one', methods=['POST'])
@cross_origin(origins='*', supports_credentials=True)
@require_user(UserType.SERVICE_PROVIDER)
def edit_item():
  # we need to know which user is logged in
  user_id = get_user_id()
  # for now we will use test user
  with generate_db_session() as db_session:
    item_id = request.form.get('item_id')
    item_name = request.form.get('item_name')
    item_description = request.form.get('item_description')
    item_category = request.form.get('item_category')
    item = db_session.query(Item).filter(and_(Item.user_id == user_id, Item.id == item_id)).first()
    if item is None:
      return jsonify(success=False, message='Item does not exist')
    item.name = item_name
    item.description = item_description
    item.category = item_category
    items = db_session.query(Item).filter(Item.user_id == user_id).all()
  return jsonify(success=True, items=items)

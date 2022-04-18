from flask import Blueprint, jsonify, request
from flask_cors import cross_origin
from sqlalchemy import and_
from auth.decorators import require_user
from database.models.items import Item
from database.orm import db_session
from user import UserType, get_user_id

delete_api = Blueprint('delete_api', __name__, url_prefix='/delete')

@delete_api.route('/one', methods=['POST'])
@require_user(UserType.SERVICE_PROVIDER)
@cross_origin(origins='*', supports_credentials=True)
def delete_item():
  # we need to know which user is logged in
  user_id = get_user_id()
  # for now we will use test user
  item_id = int(request.form.get('item_id'))
  with db_session.begin():
    db_session.query(Item).filter(and_(Item.user_id == user_id, Item.id == item_id)).delete()
  items = Item.query.filter(Item.user_id == user_id).all()
  return jsonify(success=True, items=[item.as_dict() for item in items])

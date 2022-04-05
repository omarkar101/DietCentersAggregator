from flask import Blueprint, jsonify, request
from auth.decorators import require_user
from database.models.items import Item
from database.orm import generate_db_session
from user import get_user_id, get_user_email_from_token

public_get_api = Blueprint('public_get_api', __name__, url_prefix='/public/get')

@public_get_api.route('/all', methods=['GET'])
# @require_user
def get_all_items():
  # we need to know which user is logged in
  # user = get_user_id()
  # items = user.service_provider.items
  with generate_db_session() as db_session:
    items = db_session.query(Item).all()
  return jsonify(success=True, items=items)

@public_get_api.route('of_service_provider', methods=['POST'])
def get_items_of_service_provider():
  service_provider_id = request.form.get('service_provider_id')
  with generate_db_session() as db_session:
    items = db_session.query(Item) \
      .filter(Item.user_id == service_provider_id) \
      .all()
  return jsonify(success=True, items=items)

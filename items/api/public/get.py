from flask import Blueprint, jsonify, request
from database.models.items import Item
from database.orm import db_session

public_get_api = Blueprint('public_get_api', __name__, url_prefix='/public/get')

@public_get_api.route('/all', methods=['GET'])
# @require_user
def get_all_items():
  # we need to know which user is logged in
  items = db_session.query(Item).all()
  return jsonify(success=True, items=[item.as_dict() for item in items])

@public_get_api.route('of_service_provider', methods=['POST'])
def get_items_of_service_provider():
  service_provider_id = request.form.get('service_provider_id')
  items = Item.query \
    .filter(Item.user_id == service_provider_id) \
    .all()
  return jsonify(success=True, items=[item.as_dict() for item in items])

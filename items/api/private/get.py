from flask import Blueprint, jsonify
from auth.decorators import require_user
from database.models.items import Item
from database.orm import generate_db_session
from user import get_user, get_user_email_from_token

get_api = Blueprint('get_api', __name__, url_prefix='/get')

@get_api.route('/all', methods=['POST'])
@require_user
def get_all_items():
  # we need to know which user is logged in
  # user = get_user()
  # items = user.service_provider.items
  with generate_db_session() as db_session:
    items = db_session.query(Item).all()
  return jsonify(success=True, items=items)

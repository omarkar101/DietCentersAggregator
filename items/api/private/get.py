from flask import Blueprint, jsonify
from auth.decorators import require_user
from database.models.items import Item
from database.models.service_providers_meal_plans import ServiceProviderMealPlan
from database.orm import generate_db_session
from user import UserType, get_user_id, get_user_email_from_token

get_api = Blueprint('get_api', __name__, url_prefix='/get')

@get_api.route('/all', methods=['GET'])
@require_user(UserType.SERVICE_PROVIDER)
def get_all_items():
  # we need to know which user is logged in
  user_id = get_user_id()
  # items = user.service_provider.items
  with generate_db_session() as db_session:
    items = db_session.query(Item) \
      .filter(Item.user_id == user_id) \
      .all()
  return jsonify(success=True, items=items)

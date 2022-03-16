from flask import Blueprint, jsonify
from auth.decorators import require_user
from database.models.items import Item
from database.models.service_providers_meal_plans import ServiceProviderMealPlan
from database.orm import generate_db_session
import meal_plans
from user import get_user, get_user_email_from_token

get_api = Blueprint('get_api', __name__, url_prefix='/get')

@get_api.route('/all', methods=['POST'])
# @require_user
def get_all_meal_plans():
  # we need to know which user is logged in
  # user = get_user()
  # items = user.service_provider.items
  with generate_db_session() as db_session:
    meal_plans = db_session.query(ServiceProviderMealPlan).all()
  return jsonify(success=True, meal_plans=meal_plans)

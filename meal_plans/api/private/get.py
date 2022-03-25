from flask import Blueprint, jsonify, request
from sqlalchemy import and_
from auth.decorators import require_user
from database.models.items import Item
from database.models.service_providers_meal_plans import ServiceProviderMealPlan
from database.orm import generate_db_session
from user import UserType, get_user_id, get_user_email_from_token

get_api = Blueprint('get_api', __name__, url_prefix='/get')

@get_api.route('/all', methods=['GET'])
@require_user(UserType.SERVICE_PROVIDER)
def get_all_meal_plans():
  # we need to know which user is logged in
  user_id = get_user_id()
  with generate_db_session() as db_session:
    meal_plans = db_session.query(ServiceProviderMealPlan) \
      .filter(and_(ServiceProviderMealPlan.user_id == user_id)) \
      .all()
  return jsonify(success=True, meal_plans=meal_plans)

@get_api.route('/items', methods=['GET'])
@require_user(UserType.SERVICE_PROVIDER)
def get_meal_plan_items():
  meal_plan_id = request.form.get('meal_plan_id')
  user_id = get_user_id()
  with generate_db_session() as db_session:
    meal_plan = db_session.query(ServiceProviderMealPlan) \
      .filter(and_(ServiceProviderMealPlan.user_id == user_id, ServiceProviderMealPlan.id == meal_plan_id)) \
      .first()
  return jsonify(success=True, meal_plan=meal_plan)

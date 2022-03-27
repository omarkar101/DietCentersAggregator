from flask import Blueprint, jsonify, request
from sqlalchemy import and_
from sqlalchemy.orm import joinedload
from auth.decorators import require_user
from database.models.items import Item
from database.models.service_providers_meal_plans import ServiceProviderMealPlan
from database.orm import generate_db_session
from user import UserType, get_user_id

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

@get_api.route('/items', methods=['GET', 'POST'])
@require_user(UserType.SERVICE_PROVIDER)
def get_meal_plan_items():
  user_id = get_user_id()
  meal_plan_id = request.form.get('meal_plan_id')
  with generate_db_session() as db_session:
    meal_plan = db_session.query(ServiceProviderMealPlan) \
      .filter(and_(ServiceProviderMealPlan.user_id == user_id, ServiceProviderMealPlan.id == meal_plan_id)) \
      .options(joinedload(ServiceProviderMealPlan.items)) \
      .first()
    items = [x.item for x in meal_plan.items]
  return jsonify(success=True, meal_plan_items=items)

@get_api.route('/items_not_in_meal_plan', methods=['POST'])
@require_user(UserType.SERVICE_PROVIDER)
def get_items_not_in_meal_plan():
  user_id = get_user_id()
  meal_plan_id = request.form.get('meal_plan_id')
  with generate_db_session() as db_session:
    meal_plan = db_session.query(ServiceProviderMealPlan) \
      .filter(and_(ServiceProviderMealPlan.user_id == user_id, ServiceProviderMealPlan.id == meal_plan_id)) \
      .options(joinedload(ServiceProviderMealPlan.items)) \
      .first()
    meal_plan_item_ids = [x.item_id for x in meal_plan.items]
    items = db_session.query(Item).filter(and_(Item.user_id == user_id, Item.id.notin_(meal_plan_item_ids))).all()
  print('items:', items)
  return jsonify(success=True, items=items)

from flask import Blueprint, jsonify, request
from flask_cors import cross_origin
from sqlalchemy import and_
from auth.decorators import require_user
from database.models.credentials import Credentials
from database.models.meal_plans_items import MealPlanItem
from database.models.service_providers_meal_plans import ServiceProviderMealPlan
from database.models.service_providers import ServiceProvider
from database.models.users import User
from sqlalchemy.orm import joinedload
from database.orm import generate_db_session
from user import UserType, get_user_id

delete_api = Blueprint('delete_api', __name__, url_prefix='/delete')

@delete_api.route('/one', methods=['POST'])
@require_user(UserType.SERVICE_PROVIDER)
@cross_origin(origins='*', supports_credentials=True)
def delete_meal_plan():
  # we need to know which user is logged in
  user_id = get_user_id()
  # for now we will use test user
  with generate_db_session() as db_session:
    meal_plan_id = int(request.form.get('meal_plan_id'))
    db_session.query(ServiceProviderMealPlan) \
      .filter(and_(ServiceProviderMealPlan.user_id == user_id, ServiceProviderMealPlan.id == meal_plan_id)) \
      .delete()
    meal_plans = db_session.query(ServiceProviderMealPlan).filter(ServiceProviderMealPlan.user_id == user_id).all()
    target_list = []
    for meal_plan in meal_plans:
      target_list.append(meal_plan.as_dict())
  return jsonify(success=True, meal_plans=target_list)

@delete_api.route('/item', methods=['POST'])
@require_user(UserType.SERVICE_PROVIDER)
@cross_origin(origins='*', supports_credentials=True)
def remove_item_from_meal_plan():
  user_id = get_user_id()
  with generate_db_session() as db_session:
    meal_plan_id = int(request.form.get('meal_plan_id'))
    item_id = int(request.form.get('item_id'))
    db_session.query(MealPlanItem) \
      .filter(and_(MealPlanItem.item_id == item_id, MealPlanItem.meal_plan_id == meal_plan_id)) \
      .delete()
    meal_plan = db_session.query(ServiceProviderMealPlan) \
      .options(joinedload(ServiceProviderMealPlan.items)) \
      .filter(and_(ServiceProviderMealPlan.user_id == user_id, ServiceProviderMealPlan.id == meal_plan_id)) \
      .first()
    items = [x.item for x in meal_plan.items]
  return jsonify(success=True, meal_plan_items=items)

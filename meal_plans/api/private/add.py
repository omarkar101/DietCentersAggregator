from flask import Blueprint, jsonify, request
from flask_cors import CORS, cross_origin
from auth.decorators import require_user
from sqlalchemy import and_
from sqlalchemy.orm import joinedload
from database.models.credentials import Credentials
from database.models.items import Item
from database.models.meal_plans_items import MealPlanItem
from database.models.service_providers_meal_plans import ServiceProviderMealPlan
from database.models.service_providers import ServiceProvider
from database.models.users import User
from database.orm import generate_db_session
from user import UserType, get_user_id

add_api = Blueprint('add_api', __name__, url_prefix='/add')

@add_api.route('/one', methods=['POST'])
@require_user(UserType.SERVICE_PROVIDER)
@cross_origin(origins='*', supports_credentials=True)
def add_meal_plan():
  # we need to know which user is logged in
  user_id = get_user_id()
  # for now we will use test user
  with generate_db_session() as db_session:
    meal_plan_name = request.form.get('meal_plan_name')
    meal_plan_description = request.form.get('meal_plan_description')
    # we should associate the meal plans to the current user
    meal_plan = ServiceProviderMealPlan(name=meal_plan_name, description=meal_plan_description)
    user = db_session.query(User) \
      .options(joinedload(
        User.service_provider).options(
          joinedload(ServiceProvider.meal_plans))) \
      .filter(User.id == user_id) \
      .first()
    user.service_provider.meal_plans.append(meal_plan)
    db_session.refresh(user)
  return jsonify(success=True, meal_plans=user.service_provider.meal_plans)

@add_api.route('/item', methods=['POST'])
@require_user(UserType.SERVICE_PROVIDER)
@cross_origin(origins='*', supports_credentials=True)
def add_item_to_meal_plan():
  user_id = get_user_id()
  with generate_db_session() as db_session:
    item_id = int(request.form.get('item_id'))
    meal_plan_id = int(request.form.get('meal_plan_id'))
    meal_plan = db_session.query(ServiceProviderMealPlan) \
      .options(joinedload(ServiceProviderMealPlan.items)) \
      .filter(and_(ServiceProviderMealPlan.user_id == user_id, ServiceProviderMealPlan.id == meal_plan_id)) \
      .first()
    for meal_plan_item in meal_plan.items:
      if meal_plan_item.item_id == item_id:
        return jsonify(success=True, meal_plan_items=[x.item for x in meal_plan.items])
    meal_plan_item = MealPlanItem(item_id=item_id, meal_plan_id=meal_plan_id)
    db_session.add(meal_plan_item)
    db_session.refresh(meal_plan)
    items_in_meal_plan = meal_plan.get_items()
    items_not_in_meal_plan = meal_plan.get_items_not_in_meal_plan()
  return jsonify(success=True, items_in_meal_plan=items_in_meal_plan, items_not_in_meal_plan=items_not_in_meal_plan)

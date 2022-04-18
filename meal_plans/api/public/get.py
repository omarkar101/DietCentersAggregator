from flask import Blueprint, jsonify, request
from sqlalchemy import and_
from flask_cors import cross_origin
from sqlalchemy.orm import joinedload
from database.models.service_providers_meal_plans import ServiceProviderMealPlan
from database.orm import db_session
from utils import list_to_dict_list
public_get_api = Blueprint('public_get_api', __name__, url_prefix='/public/get')

@public_get_api.route('/all', methods=['GET'])
# @require_user
def get_all_meal_plans():
  # we need to know which user is logged in
  # user = get_user_id()
  # items = user.service_provider.items
  with db_session.begin():
    meal_plans = db_session.query(ServiceProviderMealPlan).all()
    target_list = list_to_dict_list(meal_plans)
  return jsonify(success=True, meal_plans=target_list)

@public_get_api.route('/by_id', methods=['POST'])
@cross_origin(origins='*', supports_credentials=True)
def get_meal_plan_by_id():
  meal_plan_id = request.form.get('meal_plan_id')
  with db_session.begin():
    meal_plan = db_session.query(ServiceProviderMealPlan) \
      .filter(ServiceProviderMealPlan.id == meal_plan_id) \
      .first()
    target_meal_plan = meal_plan.as_dict();
  return jsonify(success=True, meal_plan=target_meal_plan)

@public_get_api.route('/of_service_provider', methods=['POST'])
def get_meal_plans_of_service_provider():
  service_provider_id = request.form.get('service_provider_id')
  with db_session.begin():
    meal_plans = db_session.query(ServiceProviderMealPlan) \
      .filter(ServiceProviderMealPlan.user_id == service_provider_id) \
      .all()
    target_list = list_to_dict_list(meal_plans)
  return jsonify(success=True, meal_plans=target_list)

@public_get_api.route('items_of_meal_plan_of_service_provider', methods=['POST'])
@cross_origin(origins='*', supports_credentials=True)
def get_meal_plan_items():
  service_provider_id = request.form.get('service_provider_id')
  meal_plan_id = request.form.get('meal_plan_id')
  with db_session.begin():
    meal_plan = db_session.query(ServiceProviderMealPlan) \
      .filter(and_(ServiceProviderMealPlan.user_id == service_provider_id, ServiceProviderMealPlan.id == meal_plan_id)) \
      .options(joinedload(ServiceProviderMealPlan.items)) \
      .first()

    print("meal plan is", meal_plan);
    items = [x.item for x in meal_plan.items]
  return jsonify(success=True, meal_plan_items=items)

@public_get_api.route('items_of_meal_plan', methods=['POST'])
@cross_origin(origins='*', supports_credentials=True)
def get_items_of_meal_plan():
  meal_plan_id = request.form.get('meal_plan_id')
  with db_session.begin():
    meal_plan = db_session.query(ServiceProviderMealPlan) \
      .filter(ServiceProviderMealPlan.id == meal_plan_id) \
      .options(joinedload(ServiceProviderMealPlan.items)) \
      .first()
    items = [x.item for x in meal_plan.items]
  return jsonify(success=True, meal_plan_items=items)

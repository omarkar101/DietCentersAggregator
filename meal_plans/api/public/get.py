from flask import Blueprint, jsonify, request
from sqlalchemy import and_
from flask_cors import cross_origin
from sqlalchemy.orm import joinedload
from database.models.service_providers_meal_plans import ServiceProviderMealPlan
from database.orm import db_session
public_get_api = Blueprint('public_get_api', __name__, url_prefix='/public/get')

@public_get_api.route('/all', methods=['GET'])
def get_all_meal_plans():
  meal_plans = db_session.query(ServiceProviderMealPlan).all()
  return jsonify(success=True, meal_plans=[meal_plan.as_dict() for meal_plan in meal_plans])

@public_get_api.route('/by_id', methods=['POST'])
@cross_origin(origins='*', supports_credentials=True)
def get_meal_plan_by_id():
  meal_plan_id = request.form.get('meal_plan_id')
  meal_plan = db_session.query(ServiceProviderMealPlan) \
    .filter(ServiceProviderMealPlan.id == meal_plan_id) \
    .first()
  return jsonify(success=True, meal_plan=meal_plan.as_dict())

@public_get_api.route('/of_service_provider', methods=['POST'])
def get_meal_plans_of_service_provider():
  service_provider_id = request.form.get('service_provider_id')
  meal_plans = db_session.query(ServiceProviderMealPlan) \
    .filter(ServiceProviderMealPlan.user_id == service_provider_id) \
    .all()
  return jsonify(success=True, meal_plans=[meal_plan.as_dict() for meal_plan in meal_plans])

@public_get_api.route('items_of_meal_plan_of_service_provider', methods=['POST'])
@cross_origin(origins='*', supports_credentials=True)
def get_meal_plan_items():
  service_provider_id = request.form.get('service_provider_id')
  meal_plan_id = request.form.get('meal_plan_id')
  meal_plan = db_session.query(ServiceProviderMealPlan) \
    .filter(and_(ServiceProviderMealPlan.user_id == service_provider_id, ServiceProviderMealPlan.id == meal_plan_id)) \
    .options(joinedload(ServiceProviderMealPlan.items)) \
    .first()
  items = [x.item.as_dict() for x in meal_plan.items]
  return jsonify(success=True, meal_plan_items=items)

@public_get_api.route('items_of_meal_plan', methods=['POST'])
@cross_origin(origins='*', supports_credentials=True)
def get_items_of_meal_plan():
  meal_plan_id = request.form.get('meal_plan_id')
  meal_plan = db_session.query(ServiceProviderMealPlan) \
    .filter(ServiceProviderMealPlan.id == meal_plan_id) \
    .options(joinedload(ServiceProviderMealPlan.items)) \
    .first()
  items = [x.item.as_dict() for x in meal_plan.items]
  return jsonify(success=True, meal_plan_items=items)

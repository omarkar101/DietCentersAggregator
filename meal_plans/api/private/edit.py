from flask import Blueprint, jsonify, request
from flask_cors import cross_origin
from sqlalchemy import and_
from auth.decorators import require_user
from database.models.service_providers_meal_plans import ServiceProviderMealPlan
from database.orm import db_session
from user import UserType, get_user_id
edit_api = Blueprint('edit_api', __name__, url_prefix='/edit')

@edit_api.route('/one', methods=['POST'])
@require_user(UserType.SERVICE_PROVIDER)
@cross_origin(origins='*', supports_credentials=True)
def edit_meal_plan():
  # we need to know which user is logged in
  user_id = get_user_id()
  # for now we will use test user
  meal_plan_id = request.form.get('meal_plan_id')
  meal_plan_name = request.form.get('meal_plan_name')
  meal_plan_description = request.form.get('meal_plan_description')
  meal_plan_price = request.form.get('meal_plan_price')
  meal_plan_uses = request.form.get('meal_plan_uses')
  meal_plan_image = request.files.get('meal_plan_image')
  meal_plan = db_session.query(ServiceProviderMealPlan) \
    .filter(and_(ServiceProviderMealPlan.user_id == user_id, ServiceProviderMealPlan.id == meal_plan_id)) \
    .first()
  if meal_plan is None:
    return jsonify(success=False, message='Meal plan does not exist')
  with db_session.begin():
    if meal_plan_image is not None:
      meal_plan.set_image(meal_plan_image)
    meal_plan.name = meal_plan_name
    meal_plan.description = meal_plan_description
    meal_plan.meal_plan_uses = meal_plan_uses
    for pricemodel in meal_plan.prices:
      if pricemodel.currency == 'USD':
        pricemodel.price = meal_plan_price
  meal_plans = db_session.query(ServiceProviderMealPlan).filter(ServiceProviderMealPlan.user_id == user_id).all()
  return jsonify(success=True, meal_plans=[meal_plan.as_dict() for meal_plan in meal_plans])

@edit_api.route('/set_availability', methods=['POST'])
@require_user(UserType.SERVICE_PROVIDER)
@cross_origin(origins='*', supports_credentials=True)
def edit_meal_plan():
  user_id = get_user_id()
  meal_plan_id = request.form.get('meal_plan_id')
  meal_plan = db_session.query(ServiceProviderMealPlan) \
    .filter(and_(ServiceProviderMealPlan.user_id == user_id, ServiceProviderMealPlan.id == meal_plan_id)) \
    .first()
  if meal_plan is None:
    return jsonify(success=False, message='Meal plan does not exist')
  with db_session.begin():
    meal_plan.isavailable = not meal_plan.isavailable
  meal_plans = db_session.query(ServiceProviderMealPlan).filter(ServiceProviderMealPlan.user_id == user_id).all()
  return jsonify(success=True, meal_plans=[meal_plan.as_dict() for meal_plan in meal_plans])
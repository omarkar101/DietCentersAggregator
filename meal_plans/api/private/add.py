from flask import Blueprint, jsonify, request
from flask_cors import CORS, cross_origin
from auth.decorators import require_user
from sqlalchemy.orm import joinedload
from database.models.credentials import Credentials
from database.models.service_providers_meal_plans import ServiceProviderMealPlan
from database.models.users import User
from database.orm import generate_db_session
from user import UserType, get_user

add_api = Blueprint('add_api', __name__, url_prefix='/add')

@add_api.route('/one', methods=['POST'])
# @require_user(UserType.SERVICE_PROVIDER)
@cross_origin(origins='*', supports_credentials=True)
def add_meal_plan():
  # we need to know which user is logged in
  # user = get_user()
  # for now we will use test user
  with generate_db_session() as db_session:
    user = db_session.query(Credentials) \
      .options(joinedload(Credentials.user).options(
        joinedload(User.service_provider)
      )) \
      .filter(Credentials.email == 'test@gmail.com') \
      .first()
    user = user.user
    meal_plan_name = request.form.get('meal_plan_name')
    meal_plan_description = request.form.get('meal_plan_description')
    # we should associate the meal plans to the current user
    meal_plan = ServiceProviderMealPlan(name=meal_plan_name, description=meal_plan_description)
    user.service_provider.meal_plans.append(meal_plan)
    db_session.refresh(user)
  return jsonify(success=True, meal_plans=user.service_provider.meal_plans)
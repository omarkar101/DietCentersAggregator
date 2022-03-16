from flask import Blueprint, jsonify, request
from flask_cors import CORS, cross_origin
from sqlalchemy import and_
from auth.decorators import require_user
from sqlalchemy.orm import joinedload
from database.models.credentials import Credentials
from database.models.service_providers_meal_plans import ServiceProviderMealPlan
from database.models.service_providers import ServiceProvider
from database.models.users import User
from database.orm import generate_db_session
from user import UserType, get_user

edit_api = Blueprint('edit_api', __name__, url_prefix='/edit')

@edit_api.route('/one', methods=['POST'])
@cross_origin(origins='*', supports_credentials=True)
def edit_meal_plan():
  # we need to know which user is logged in
  # user = get_user()
  # for now we will use test user
  with generate_db_session() as db_session:
    user = db_session.query(Credentials) \
      .options(joinedload(Credentials.user).options(
        joinedload(User.service_provider).options(
          joinedload(ServiceProvider.meal_plans))
      )) \
      .filter(Credentials.email == 'test@gmail.com') \
      .first()
    user = user.user
    meal_plan_id = request.form.get('meal_plan_id')
    meal_plan_name = request.form.get('meal_plan_name')
    meal_plan_description = request.form.get('meal_plan_description')
    meal_plan = db_session.query(ServiceProviderMealPlan).filter(and_(ServiceProviderMealPlan.user_id == user.id, ServiceProviderMealPlan.id == meal_plan_id)).first()
    if meal_plan is None:
      return jsonify(success=False, message='Meal plan does not exist')
    meal_plan.name = meal_plan_name
    meal_plan.description = meal_plan_description
    db_session.refresh(user)
  return jsonify(success=True, meal_plans=user.service_provider.meal_plans)

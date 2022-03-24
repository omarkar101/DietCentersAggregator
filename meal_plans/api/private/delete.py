from flask import Blueprint, jsonify, request
from flask_cors import cross_origin
from sqlalchemy import and_
from database.models.credentials import Credentials
from database.models.service_providers_meal_plans import ServiceProviderMealPlan
from database.models.service_providers import ServiceProvider
from database.models.users import User
from sqlalchemy.orm import joinedload
from database.orm import generate_db_session

delete_api = Blueprint('delete_api', __name__, url_prefix='/delete')

@delete_api.route('/one', methods=['POST'])
@cross_origin(origins='*', supports_credentials=True)
def delete_meal_plan():
  # we need to know which user is logged in
  # user = get_user_id()
  # for now we will use test user
  with generate_db_session() as db_session:
    user = db_session.query(Credentials) \
      .options(joinedload(Credentials.user).options(
        joinedload(User.service_provider).options(
          joinedload(ServiceProvider.meal_plans)
        )
      )) \
      .filter(Credentials.email == 'test@gmail.com') \
      .first()
    user = user.user
    meal_plan_id = int(request.form.get('meal_plan_id'))
    db_session.query(ServiceProviderMealPlan).filter(and_(ServiceProviderMealPlan.user_id == user.id, ServiceProviderMealPlan.id == meal_plan_id)).delete()
    db_session.refresh(user) # refreshing here is import since we need the new state of the user after deleting an item
  return jsonify(success=True, meal_plans=user.service_provider.meal_plans)

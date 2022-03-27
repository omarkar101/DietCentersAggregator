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
from azure.storage.blob import BlockBlobService
from user import UserType, get_user_id

edit_api = Blueprint('edit_api', __name__, url_prefix='/edit')

blob_service = BlockBlobService(
  account_name='299storage',
  account_key='59A1sn1/V/JbS9fCQvtgWcJsP9WZYOJJMDnm+FZjCRFzsRtNYVce/NP7MZDHaf4VlhQgAlD16kRL+AStxRd4uQ==')

@edit_api.route('/one', methods=['POST'])
@cross_origin(origins='*', supports_credentials=True)
def edit_meal_plan():
  # we need to know which user is logged in
  user_id = get_user_id()
  # for now we will use test user
  with generate_db_session() as db_session:
    meal_plan_id = request.form.get('meal_plan_id')
    meal_plan_name = request.form.get('meal_plan_name')
    meal_plan_description = request.form.get('meal_plan_description')
    meal_plan = db_session.query(ServiceProviderMealPlan) \
      .filter(and_(ServiceProviderMealPlan.user_id == user_id, ServiceProviderMealPlan.id == meal_plan_id)) \
      .first()
    if meal_plan is None:
      return jsonify(success=False, message='Meal plan does not exist')
    # file = request.files['image']
    # filename = file.filename
    # blob_service.create_blob_from_stream('container', filename, file)
    meal_plan.name = meal_plan_name
    meal_plan.description = meal_plan_description
    meal_plans = db_session.query(ServiceProviderMealPlan).filter(ServiceProviderMealPlan.user_id == user_id).all()
  return jsonify(success=True, meal_plans=meal_plans)

@edit_api.route('/image', methods=['POST'])
@cross_origin(origins='*', supports_credentials=True)
def edit_meal_plan_image():
  # we need to know which user is logged in
  # user_id = get_user_id()
  # for now we will use test user
  with generate_db_session() as db_session:
    # meal_plan_id = request.form.get('meal_plan_id')
    # meal_plan = db_session.query(ServiceProviderMealPlan) \
    #   .filter(ServiceProviderMealPlan.id == meal_plan_id) \
    #   .first()
    file = request.files['image']
    filename = file.filename
    blob_service.create_blob_from_stream('container', filename, file)
    ref =  'http://'+ '299storage' + '.blob.core.windows.net/' + 'container' + '/' + filename
  return jsonify(success=True, image_link=ref)

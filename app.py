from flask import Flask
from flask_cors import CORS, cross_origin
from auth.api import auth_api
from items.api import items_api
from meal_plans.api import meal_plans_api
from service_providers.api import service_providers_api
from user.api import user_api
from auth.decorators import require_user
from database.models.meal_plans_items import MealPlanItem
from database.models.credentials import Credentials
from database.models.addresses import Address
from database.models.users import User
from database.models.clients import Client
from database.models.service_providers import ServiceProvider
from database.models.clients_biometrics import ClientBiometrics
from database.models.service_providers_meal_plans import ServiceProviderMealPlan
from database.models.meal_plans_prices import MealPlanPrice
from database.models.items import Item
from database.models.categories import Category
from azure.storage.blob import BlockBlobService
from user import UserType
from MonthlyActions.helpers import resetAllSessions

import atexit

from apscheduler.schedulers.background import BackgroundScheduler
scheduler = BackgroundScheduler()
scheduler.add_job(func=resetAllSessions, trigger="cron", year='*', month='*', day='last')
scheduler.start()
atexit.register(lambda: scheduler.shutdown())

app = Flask(__name__)
CORS(app, support_credentials=True)
app.config['SECRET_KEY'] = 'this_key_here'
app.config['blob_service'] = BlockBlobService(
  account_name='299storage',
  account_key='59A1sn1/V/JbS9fCQvtgWcJsP9WZYOJJMDnm+FZjCRFzsRtNYVce/NP7MZDHaf4VlhQgAlD16kRL+AStxRd4uQ==')
app.register_blueprint(auth_api)
app.register_blueprint(items_api)
app.register_blueprint(meal_plans_api)
app.register_blueprint(service_providers_api)
app.register_blueprint(user_api)

@app.route('/',methods = ['POST'])
@require_user(UserType.CLIENT)
def hello():
    return 'hello'

if __name__ == '__main__':
    app.run(debug=True)

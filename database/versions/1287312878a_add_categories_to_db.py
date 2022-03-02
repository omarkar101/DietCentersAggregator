"""added categories table

Revision ID: 1287312878a
Revises: 0c0066633a9f
Create Date: 2022-02-20 17:37:41.589399

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1287312878a'
down_revision = '0c0066633a9f'
branch_labels = None
depends_on = None


def upgrade():
  connection = op.get_bind()
  l = ['Asian Fusion',
    'Bagels',
    'Bakery',
    'Bar / Lounge / Pub',
    'Barbeque',
    'Breakfast',
    'British',
    'Brunch',
    'Burgers',
    'Cajun/Creole',
    'Caribbean',
    'Chinese',
    'Coffee / Espresso',
    'Country Food',
    'Cuban',
    'Deli',
    'Doughnuts',
    'Family Fare',
    'Fast Food',
    'Fine Dining',
    'Food Trucks',
    'French',
    'German',
    'Gluten-free',
    'Greek',
    'Happy Hour',
    'Hot Dogs',
    'Ice Cream',
    'Indian',
    'Irish',
    'Italian',
    'Japanese',
    'Latin American',
    'Live Entertainment',
    'Mediterranean',
    'Mexican',
    'Pancakes/Waffles',
    'Pizza',
    'Polish',
    'Sandwiches',
    'Seafood',
    'Soul Food',
    'Soup & Salad',
    'Southern',
    'Spanish',
    'Sports Bar',
    'Steaks',
    'Sushi',
    'Tapas',
    'Thai',
    'Vegan Friendly',
    'Vegetarian',
    'Waterfront']

  for categ in l:
    connection.execute('INSERT INTO categories (name) VALUES(%s)', categ)

def downgrade():
  pass

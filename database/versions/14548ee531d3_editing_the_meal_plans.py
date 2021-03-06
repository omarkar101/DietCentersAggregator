"""editing the meal plans

Revision ID: 14548ee531d3
Revises: 124124122a2
Create Date: 2022-03-16 19:13:53.744933

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '14548ee531d3'
down_revision = '124124122a2'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('items_category_key', 'items', type_='unique')
    op.drop_constraint('items_description_key', 'items', type_='unique')
    op.drop_constraint('items_name_key', 'items', type_='unique')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_unique_constraint('items_name_key', 'items', ['name'])
    op.create_unique_constraint('items_description_key', 'items', ['description'])
    op.create_unique_constraint('items_category_key', 'items', ['category'])
    # ### end Alembic commands ###

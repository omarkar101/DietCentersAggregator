"""added meal plans items table

Revision ID: 44ae0eeb8291
Revises: 14548ee531d3
Create Date: 2022-03-26 11:44:37.287113

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '44ae0eeb8291'
down_revision = '14548ee531d3'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('meal_plans_items',
        sa.Column('item_id', sa.BigInteger(), nullable=False),
        sa.Column('meal_plan_id', sa.BigInteger(), nullable=False),
        sa.ForeignKeyConstraint(['item_id'], ['items.id'], ondelete='CASCADE'),
        sa.ForeignKeyConstraint(['meal_plan_id'], ['service_providers_meal_plans.id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('item_id', 'meal_plan_id'))

def downgrade():
    op.drop_table('meal_plans_items')

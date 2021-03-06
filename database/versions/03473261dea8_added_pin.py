"""added pin

Revision ID: 03473261dea8
Revises: 7e06b7a391fb
Create Date: 2022-04-24 03:07:02.980932

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '03473261dea8'
down_revision = '7e06b7a391fb'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('credentials', sa.Column('forget_password_pin', sa.Text(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('credentials', 'forget_password_pin')
    # ### end Alembic commands ###

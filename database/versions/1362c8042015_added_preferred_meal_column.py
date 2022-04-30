"""added preferred meal column

Revision ID: 1362c8042015
Revises: 5a370c08c82e
Create Date: 2022-04-23 01:53:26.030006

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1362c8042015'
down_revision = '5a370c08c82e'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('clients', sa.Column('preferred_meal', sa.BigInteger(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('clients', 'preferred_meal')
    # ### end Alembic commands ###
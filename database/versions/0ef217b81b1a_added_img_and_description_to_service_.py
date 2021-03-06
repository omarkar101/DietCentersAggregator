"""added img and description to service provider

Revision ID: 0ef217b81b1a
Revises: 5a370c08c82e
Create Date: 2022-04-24 00:40:21.011225

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '0ef217b81b1a'
down_revision = '5a370c08c82e'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('service_providers', sa.Column('description', sa.Text(), nullable=True))
    op.add_column('service_providers', sa.Column('img_url', sa.Text(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('service_providers', 'img_url')
    op.drop_column('service_providers', 'description')
    # ### end Alembic commands ###

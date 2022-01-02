"""added primary key to id

Revision ID: 12378172782e
Revises: 49d899dd8809
Create Date: 2022-01-02 18:31:31.305380

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '12378172782e'
down_revision = '49d899dd8809'
branch_labels = None
depends_on = None


def upgrade():
    op.create_primary_key('pk_users', 'users', ['id'])

def downgrade():
    pass
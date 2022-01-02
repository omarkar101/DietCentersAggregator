"""Added users table

Revision ID: c1332cd29de1
Revises: 340e96fab76d
Create Date: 2022-01-02 17:44:47.385403

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c1332cd29de1'
down_revision = '340e96fab76d'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('users')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('username', sa.TEXT(), autoincrement=False, nullable=False),
    sa.Column('password', sa.TEXT(), autoincrement=False, nullable=True),
    sa.PrimaryKeyConstraint('username', name='users_pkey'),
    sa.UniqueConstraint('username', name='users_username_key')
    )
    # ### end Alembic commands ###
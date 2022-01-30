"""Separated tables for business logic

Revision ID: 4a514124fe11
Revises: 05838fdafe6c
Create Date: 2022-01-30 18:32:31.216076

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4a514124fe11'
down_revision = '05838fdafe6c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('clients',
    sa.Column('id', sa.BigInteger(), autoincrement=True, nullable=False),
    sa.Column('first_name', sa.Text(), nullable=False),
    sa.Column('last_name', sa.Text(), nullable=False),
    sa.Column('user_id', sa.BigInteger(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('user_id'),
    sa.UniqueConstraint('user_id')
    )
    op.create_table('service_providers',
    sa.Column('id', sa.BigInteger(), autoincrement=True, nullable=False),
    sa.Column('name', sa.Text(), nullable=False),
    sa.Column('user_id', sa.BigInteger(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('user_id'),
    sa.UniqueConstraint('user_id')
    )
    op.create_table('clients_biometrics',
    sa.Column('id', sa.BigInteger(), autoincrement=True, nullable=False),
    sa.Column('age', sa.Integer(), nullable=True),
    sa.Column('height', sa.REAL(), nullable=True),
    sa.Column('weight', sa.REAL(), nullable=True),
    sa.Column('client_id', sa.BigInteger(), nullable=False),
    sa.ForeignKeyConstraint(['client_id'], ['clients.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('client_id'),
    sa.UniqueConstraint('client_id')
    )
    op.drop_column('users', 'first_name')
    op.drop_column('users', 'last_name')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('last_name', sa.TEXT(), autoincrement=False, nullable=False))
    op.add_column('users', sa.Column('first_name', sa.TEXT(), autoincrement=False, nullable=False))
    op.drop_table('clients_biometrics')
    op.drop_table('service_providers')
    op.drop_table('clients')
    # ### end Alembic commands ###
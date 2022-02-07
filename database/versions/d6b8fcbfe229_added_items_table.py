"""Added Items Table

Revision ID: d6b8fcbfe229
Revises: cda8db07a7de
Create Date: 2022-02-03 21:30:07.991319

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd6b8fcbfe229'
down_revision = 'cda8db07a7de'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('Item',
    sa.Column('id', sa.BigInteger(), autoincrement=True, nullable=False),
    sa.Column('category', sa.Text(), nullable=False),
    sa.Column('description', sa.Text(), nullable=False),
    sa.Column('name', sa.Text(), nullable=False),
    sa.Column('user_id', sa.BigInteger(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['service_providers.user_id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('category'),
    sa.UniqueConstraint('category'),
    sa.UniqueConstraint('description'),
    sa.UniqueConstraint('description'),
    sa.UniqueConstraint('name'),
    sa.UniqueConstraint('name')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('Item')
    # ### end Alembic commands ###

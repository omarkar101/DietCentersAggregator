"""add test service provider

Revision ID: 124124122a2
Revises: 1287312878a
Create Date: 2022-02-20 17:37:41.589399

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '124124122a2'
down_revision = '1287312878a'
branch_labels = None
depends_on = None


def upgrade():
  connection = op.get_bind()
  credentials_id = connection.execute('INSERT INTO credentials (email, password_hash, password_salt) \
                    VALUES(%s, %s, %s) RETURNING id', ('test@gmail.com', 'ebc1bc7fb47a304dfbe55fe7a4e7511d051f703e744070813457dc1b7b7279147e1ee5a77c1cec23ac9f96494b6c8dd5d76d8a79fc576615f16016651d62277c',
                     '46889145cf9e4dc099faa98e149bbc4b')).fetchone()[0]
  user_id = connection.execute('INSERT INTO users (credentials_id, user_type, phone_number) VALUES(%s, %s, %s) RETURNING id',
                              (credentials_id, 'service_provider', '12345')).fetchone()[0]
  connection.execute('INSERT INTO service_providers (user_id, name) VALUES (%s, %s)',
                    (user_id, 'SPTEST'))
def downgrade():
  pass

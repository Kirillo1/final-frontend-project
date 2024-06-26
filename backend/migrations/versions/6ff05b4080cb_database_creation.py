"""Database creation

Revision ID: 6ff05b4080cb
Revises: 
Create Date: 2024-06-13 12:28:05.279848

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '6ff05b4080cb'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('smartphones',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('name', sa.String(), nullable=False),
                    sa.Column('model_phone', sa.String(), nullable=False),
                    sa.Column('price', sa.Integer(), nullable=False),
                    sa.Column('created_at', sa.TIMESTAMP(), nullable=True),
                    sa.PrimaryKeyConstraint('id')
                    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('smartphones')
    # ### end Alembic commands ###

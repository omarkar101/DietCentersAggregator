from sqlalchemy import Column, BigInteger, Text, ForeignKey, DateTime
from sqlalchemy.ext.hybrid import hybrid_property
from database.orm import Base
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

class Order(Base):
	__tablename__ = 'orders'

	id = Column(BigInteger, primary_key=True, autoincrement=True)
	_date_sent = Column(DateTime(True), nullable=False, server_default=func.now())

	user_id = Column(ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
	item_id = Column(ForeignKey('items.id', ondelete='CASCADE'), nullable=False)

	user = relationship(
        'User',
        uselist=False,
        back_populates='orders')
	item = relationship(
		'Item',
		uselist=False,
		back_populates='orders'
	)
	@hybrid_property
	def date_sent(self):
		return self._date_sent
	@date_sent.setter
	def date_sent(self, date_sent):
		self._date_sent = date_sent

	def as_dict(self):
		information = {c.name: getattr(self, c.name) for c in self.__table__.columns}
		return information
    
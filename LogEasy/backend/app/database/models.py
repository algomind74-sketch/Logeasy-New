from sqlalchemy import Column, Integer, String, DateTime
from app.database.db_session import Base
import datetime

class Log(Base):
    __tablename__ = "logs"
    id = Column(Integer, primary_key=True, index=True)
    level = Column(String)
    message = Column(String)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

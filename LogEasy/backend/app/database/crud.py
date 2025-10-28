# def insert_log_entry(db, service, level, message, timestamp):
#     new_log = Log(service=service, level=level, message=message, timestamp=timestamp)
#     db.add(new_log)
#     db.commit()
#-------------------
from sqlalchemy.orm import Session
from app.database.models import Log

def create_log(db: Session, level: str, message: str):
    log = Log(level=level, message=message)
    db.add(log)
    db.commit()
    db.refresh(log)
    return log

def get_logs(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Log).offset(skip).limit(limit).all()

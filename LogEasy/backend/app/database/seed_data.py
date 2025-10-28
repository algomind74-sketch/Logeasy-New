from sqlalchemy.orm import Session
from app.database.db_session import engine, SessionLocal, Base
from app.database.models import Log
from datetime import datetime
import random

# Sample log levels and messages
LOG_LEVELS = ["INFO", "WARNING", "ERROR", "DEBUG"]
SERVICES = ["AuthService", "PaymentService", "NetworkService"]

SAMPLE_MESSAGES = [
    "User logged in successfully",
    "Payment transaction failed",
    "Network timeout occurred",
    "Disk space running low",
    "New user registered",
    "API request failed",
    "Database connection error",
    "Scheduled job completed"
]

# Create tables if not exists
Base.metadata.create_all(bind=engine)

def seed_logs(db: Session, num_logs: int = 50):
    for _ in range(num_logs):
        level = random.choice(LOG_LEVELS)
        service = random.choice(SERVICES)
        message = f"[{service}] {random.choice(SAMPLE_MESSAGES)}"
        log_entry = Log(
            level=level,
            message=message,
            created_at=datetime.utcnow()
        )
        db.add(log_entry)
    db.commit()
    print(f"✅ Seeded {num_logs} logs into the database")

if __name__ == "__main__":
    db = SessionLocal()
    seed_logs(db, num_logs=100)  # Seed 100 sample logs
    db.close()

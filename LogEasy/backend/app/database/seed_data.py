from backend.app.database.db_session import SessionLocal, engine
from backend.app.database.models import Base, Log
from datetime import datetime

# ✅ Create all tables if they don't exist
Base.metadata.create_all(bind=engine)

# ✅ Example seed data
sample_logs = [
    Log(level="INFO", message="Server started successfully", created_at=datetime(2025, 10, 20, 10, 0)),
    Log(level="WARNING", message="High memory usage detected in Payments service", created_at=datetime(2025, 10, 21, 12, 30)),
    Log(level="ERROR", message="Database connection timeout in Auth service", created_at=datetime(2025, 10, 22, 14, 15)),
    Log(level="INFO", message="New user registration completed", created_at=datetime(2025, 10, 23, 9, 45)),
    Log(level="ERROR", message="Payment gateway request failed", created_at=datetime(2025, 10, 24, 17, 10)),
]

def seed_database():
    """Populate the database with initial sample logs."""
    db = SessionLocal()
    try:
        # Check if data already exists
        existing_logs = db.query(Log).count()
        if existing_logs == 0:
            db.add_all(sample_logs)
            db.commit()
            print("✅ Database seeded with sample logs.")
        else:
            print("ℹ️ Database already contains logs — skipping seeding.")
    except Exception as e:
        print("❌ Error seeding database:", e)
        db.rollback()
    finally:
        db.close()


if __name__ == "__main__":
    seed_database()
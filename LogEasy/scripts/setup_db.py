from app.database.db_session import Base, engine
from app.database.models import Log

def init_db():
    print("Creating database tables...")
    Base.metadata.create_all(bind=engine)
    print("Database setup complete.")

if __name__ == "__main__":
    init_db()

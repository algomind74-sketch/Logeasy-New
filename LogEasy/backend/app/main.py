from fastapi import FastAPI
from app.api.routes import logs, insights, reports, auth

app = FastAPI(title="LogEasy Backend")

# Include all routes
app.include_router(logs.router, prefix="/logs", tags=["Logs"])
app.include_router(insights.router, prefix="/insights", tags=["Insights"])
app.include_router(reports.router, prefix="/reports", tags=["Reports"])
app.include_router(auth.router, prefix="/auth", tags=["Auth"])

@app.get("/")
def root():
    return {"message": "Welcome to LogEasy API"}

from fastapi import FastAPI
from app.api.routes import logs, insights, reports

# ✅ Create FastAPI app instance
app = FastAPI(
    title="LogEasy Backend",
    description="AI-powered log analytics platform",
    version="1.0.0",
)

# ✅ Include API routes
app.include_router(logs.router, prefix="/logs", tags=["Logs"])
app.include_router(insights.router, prefix="/ai", tags=["AI Insights"])
app.include_router(reports.router, prefix="/reports", tags=["Reports"])

# ✅ Root endpoint
@app.get("/")
def read_root():
    return {"message": "🚀 LogEasy backend is running!"}

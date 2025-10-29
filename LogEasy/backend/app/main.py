from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import logs, insights, reports, compliance, Settings  # ✅ Capital S is fine

app = FastAPI(
    title="LogEasy Backend",
    description="AI-powered log analytics platform",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Keep prefix lowercase (this affects API URL)
app.include_router(logs.router, prefix="/logs", tags=["Logs"])
app.include_router(insights.router, prefix="/ai", tags=["AI Insights"])
app.include_router(reports.router, prefix="/reports", tags=["Reports"])
app.include_router(compliance.router, prefix="/compliance", tags=["Compliance"])
app.include_router(Settings.router, prefix="/settings", tags=["Settings"])  # ✅ lowercase prefix

@app.get("/")
def read_root():
    return {"message": "🚀 LogEasy backend is running!"}

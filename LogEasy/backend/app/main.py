from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import logs, insights, reports, compliance  # ✅ Added compliance

# ✅ Create FastAPI app instance only once
app = FastAPI(
    title="LogEasy Backend",
    description="AI-powered log analytics platform",
    version="1.0.0",
)

# ✅ Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for local development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Include API routes
app.include_router(logs.router, prefix="/logs", tags=["Logs"])
app.include_router(insights.router, prefix="/ai", tags=["AI Insights"])
app.include_router(reports.router, prefix="/reports", tags=["Reports"])
app.include_router(compliance.router, prefix="/compliance", tags=["Compliance"])  # ✅ Added

# ✅ Root endpoint
@app.get("/")
def read_root():
    return {"message": "🚀 LogEasy backend is running!"}

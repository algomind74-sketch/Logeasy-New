from fastapi import APIRouter
from datetime import datetime
from app.services.compliance import generate_compliance_report  # ✅ Your service logic

router = APIRouter()

# ✅ GET /compliance/status
@router.get("/status")
async def get_compliance_status():
    """
    Returns mock compliance summary for dashboard visualization.
    Replace with real data later if needed.
    """
    compliance_summary = {
        "status": "Compliant",
        "checks_passed": 12,
        "checks_failed": 2,
        "last_audit": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "recommendations": [
            "Enable encryption at rest for all log files",
            "Implement role-based access control for users",
            "Add anomaly detection for admin logins",
        ],
        "critical_issues": [
            {"id": 1, "description": "Unencrypted API key found in environment"},
            {"id": 2, "description": "SSL certificate nearing expiry"},
        ],
    }
    return compliance_summary


# ✅ POST /compliance/generate
@router.post("/generate")
async def generate_compliance_doc():
    """
    Generates a compliance DOCX report and returns its path.
    """
    report_path = generate_compliance_report()
    return {
        "message": "Compliance report generated successfully ✅",
        "path": report_path,
    }
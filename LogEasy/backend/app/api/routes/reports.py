from fastapi import APIRouter

router = APIRouter()

@router.get("/generate")
async def generate_report():
    # TODO: Later replace with real report generation logic (PDF/DOCX)
    return {"report": "Report generated successfully"}

@router.get("/list")
async def list_reports():
    # Temporary mock data for frontend testing
    return {
        "reports": [
            {"id": 1, "name": "Error Summary Report", "created_at": "2025-10-28"},
            {"id": 2, "name": "Daily Log Report", "created_at": "2025-10-27"},
        ]
    }

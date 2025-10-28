from fastapi import APIRouter

router = APIRouter()

@router.get("/generate")
async def generate_report():
    # TODO: Generate PDF/DOCX report
    return {"report": "Report generated successfully"}

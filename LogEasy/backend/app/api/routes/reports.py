from fastapi import APIRouter, Path
from fastapi.responses import StreamingResponse
from io import BytesIO
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.units import inch
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from datetime import datetime

router = APIRouter()

@router.get("/generate")
async def generate_report():
    return {"report": "Report generated successfully"}

@router.get("/list")
async def list_reports():
    return {
        "reports": [
            {"id": 1, "name": "Error Summary Report", "created_at": "2025-10-28"},
            {"id": 2, "name": "Daily Log Report", "created_at": "2025-10-27"},
        ]
    }

@router.get("/download/{filename}")
async def download_report(filename: str = Path(...)):
    # Create PDF in memory
    buffer = BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=A4)
    styles = getSampleStyleSheet()
    story = []

    # Header
    story.append(Paragraph("📘 LogEasy System Report", styles["Title"]))
    story.append(Spacer(1, 12))

    # Report info
    story.append(Paragraph(f"Report: {filename}", styles["Heading2"]))
    story.append(Paragraph(f"Generated on: {datetime.now().strftime('%d-%m-%Y %I:%M %p')}", styles["Normal"]))
    story.append(Spacer(1, 20))

    # Example data
    data = [
        ["Metric", "Value"],
        ["Total Logs", "1024"],
        ["Errors", "72"],
        ["Warnings", "128"],
        ["Active Users", "15"],
        ["Status", "All Systems Operational ✅"],
    ]

    # Table styling
    table = Table(data, colWidths=[2.5 * inch, 3.5 * inch])
    table.setStyle(
        TableStyle([
            ("BACKGROUND", (0, 0), (-1, 0), colors.lightblue),
            ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
            ("ALIGN", (0, 0), (-1, -1), "CENTER"),
            ("GRID", (0, 0), (-1, -1), 0.5, colors.grey),
        ])
    )
    story.append(table)
    story.append(Spacer(1, 12))

    # Summary
    story.append(Paragraph("Summary: No major system issues detected in the last 24 hours.", styles["Normal"]))
    doc.build(story)

    # Reset buffer position
    buffer.seek(0)

    # Create safe filename
    safe_filename = filename.replace(" ", "_") + ".pdf"

    # Return PDF as downloadable file
    return StreamingResponse(
        buffer,
        media_type="application/pdf",
        headers={
            "Content-Disposition": f"attachment; filename={safe_filename}",
            "Content-Type": "application/pdf"
        },
    )

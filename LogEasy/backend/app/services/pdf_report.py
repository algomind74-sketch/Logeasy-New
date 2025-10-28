from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from app.database.crud import get_logs
from app.database.db_session import SessionLocal
from datetime import datetime
import os

PDF_DIR = "data/reports/pdf/"
os.makedirs(PDF_DIR, exist_ok=True)


def generate_pdf_report(title="LogEasy Report", start_date=None, end_date=None, filename=None):
    """
    Generate a PDF report summarizing logs within a date range.

    Args:
        title (str): Title of the report
        start_date (datetime, optional): Filter logs from this date
        end_date (datetime, optional): Filter logs until this date
        filename (str, optional): PDF filename

    Returns:
        str: Path to the generated PDF
    """
    db = SessionLocal()
    logs = get_logs(db, start_date=start_date, end_date=end_date)
    db.close()

    if not filename:
        today_str = datetime.now().strftime("%Y_%m_%d")
        filename = f"pdf_report_{today_str}.pdf"

    path = os.path.join(PDF_DIR, filename)

    c = canvas.Canvas(path, pagesize=A4)
    width, height = A4

    # Title
    c.setFont("Helvetica-Bold", 18)
    c.drawString(50, height - 50, title)

    # Date range
    c.setFont("Helvetica", 12)
    c.drawString(50, height - 80,
                 f"Date Range: {start_date if start_date else 'Beginning'} - {end_date if end_date else 'Now'}")

    # Summary by log level
    summary = {}
    for log in logs:
        summary[log.level] = summary.get(log.level, 0) + 1

    c.drawString(50, height - 110, "Summary by Log Level:")
    y = height - 130
    for level, count in summary.items():
        c.drawString(70, y, f"{level}: {count}")
        y -= 20

    # Detailed logs
    c.drawString(50, y, "Detailed Logs:")
    y -= 20
    for log in logs:
        text = f"[{log.created_at}] [{log.level}] {log.message}"
        if y < 50:  # Start new page
            c.showPage()
            y = height - 50
        c.drawString(70, y, text)
        y -= 15

    c.save()
    print(f"✅ PDF report generated: {path}")
    return path


# Optional: test
if __name__ == "__main__":
    report_path = generate_pdf_report()
    print("PDF saved at:", report_path)

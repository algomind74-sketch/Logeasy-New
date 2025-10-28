import os
import pytest
from datetime import datetime
from app.services import pdf_report, compliance

# -----------------------------
# Test PDF report generation
# -----------------------------
def test_generate_pdf_report():
    report_path = pdf_report.generate_pdf_report(
        title="Test PDF Report",
        start_date=datetime(2025, 1, 1),
        end_date=datetime(2025, 12, 31)
    )

    # Assert file exists
    assert os.path.exists(report_path)
    # Assert file is a PDF
    assert report_path.endswith(".pdf")

    # Optional cleanup
    os.remove(report_path)
    assert not os.path.exists(report_path)

# -----------------------------
# Test DOCX compliance report generation
# -----------------------------
def test_generate_compliance_report():
    report_path = compliance.generate_compliance_report(
        start_date=datetime(2025, 1, 1),
        end_date=datetime(2025, 12, 31),
        filename="test_compliance.docx"
    )

    # Assert file exists
    assert os.path.exists(report_path)
    # Assert file is a DOCX
    assert report_path.endswith(".docx")

    # Optional cleanup
    os.remove(report_path)
    assert not os.path.exists(report_path)

# -----------------------------
# Test both reports together
# -----------------------------
def test_reports_generation_combined():
    pdf_path = pdf_report.generate_pdf_report(title="Combined Test")
    docx_path = compliance.generate_compliance_report(filename="combined_test.docx")

    assert os.path.exists(pdf_path)
    assert os.path.exists(docx_path)

    # Optional cleanup
    os.remove(pdf_path)
    os.remove(docx_path)

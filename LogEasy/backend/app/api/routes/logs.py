from fastapi import APIRouter

router = APIRouter()
@router.get("/stats")
async def get_log_stats():
    logs = get_all_logs_from_db()  # from crud.py
    # Example mock stats (you’ll later connect with real DB aggregation)
    error_trend = [
        {"timestamp": "2025-10-01", "error_count": 20},
        {"timestamp": "2025-10-02", "error_count": 35},
        {"timestamp": "2025-10-03", "error_count": 15},
        {"timestamp": "2025-10-04", "error_count": 28},
    ]
    service_error_count = [
        {"service": "Auth", "errors": 45},
        {"service": "Payments", "errors": 72},
        {"service": "Orders", "errors": 30},
        {"service": "Inventory", "errors": 18},
    ]
    return {"error_trend": error_trend, "service_error_count": service_error_count}
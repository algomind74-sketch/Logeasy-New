from fastapi import APIRouter, Query

router = APIRouter()  # no prefix here (main.py adds /logs)

# ✅ 1️⃣ /logs/stats – analytics data for dashboard
@router.get("/stats")
async def get_log_stats():
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

    return {
        "total_logs": 200,
        "error_logs": 72,
        "active_users": 15,
        "error_trend": error_trend,
        "service_error_count": service_error_count,
    }


# ✅ 2️⃣ /logs – full log list
@router.get("/")
async def get_logs():
    logs = [
        {"timestamp": "2025-10-29 09:00:00", "service": "Auth", "level": "INFO", "message": "User login successful"},
        {"timestamp": "2025-10-29 09:05:00", "service": "Payments", "level": "ERROR", "message": "Payment gateway timeout"},
        {"timestamp": "2025-10-29 09:10:00", "service": "Orders", "level": "WARNING", "message": "Order processing delayed"},
        {"timestamp": "2025-10-29 09:15:00", "service": "Payments", "level": "ERROR", "message": "Transaction declined"},
    ]
    return logs


# ✅ 3️⃣ /logs/search – filter logs by keyword
@router.get("/search")
async def search_logs(
    keyword: str = Query(None, description="Keyword to filter logs (service, level, or message)")
):
    all_logs = [
        {"timestamp": "2025-10-29 09:00:00", "service": "Auth", "level": "INFO", "message": "User login successful"},
        {"timestamp": "2025-10-29 09:05:00", "service": "Payments", "level": "ERROR", "message": "Payment gateway timeout"},
        {"timestamp": "2025-10-29 09:10:00", "service": "Orders", "level": "WARNING", "message": "Order processing delayed"},
        {"timestamp": "2025-10-29 09:15:00", "service": "Payments", "level": "ERROR", "message": "Transaction declined"},
    ]

    if not keyword:
        return all_logs

    keyword = keyword.lower()
    filtered_logs = [
        log for log in all_logs
        if keyword in log["message"].lower()
        or keyword in log["service"].lower()
        or keyword in log["level"].lower()
    ]

    return filtered_logs

from fastapi import APIRouter

router = APIRouter()

# ✅ 1️⃣ /logs/stats – for analytics graphs
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
        "error_trend": error_trend,
        "service_error_count": service_error_count,
    }


# ✅ 2️⃣ /logs – for table display in LogsTable.jsx
@router.get("")
async def get_logs():
    logs = [
        {
            "timestamp": "2025-10-29 09:00:00",
            "service": "Auth",
            "level": "INFO",
            "message": "User login successful",
        },
        {
            "timestamp": "2025-10-29 09:05:00",
            "service": "Payments",
            "level": "ERROR",
            "message": "Payment gateway timeout",
        },
        {
            "timestamp": "2025-10-29 09:10:00",
            "service": "Orders",
            "level": "WARNING",
            "message": "Order processing delayed",
        },
    ]
    return logs
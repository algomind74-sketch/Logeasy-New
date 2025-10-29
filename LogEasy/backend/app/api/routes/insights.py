from fastapi import APIRouter

router = APIRouter()

@router.get("/insights")
async def get_ai_insights():
    # Mock AI insights for now (replace later with real ML logic)
    insights = {
        "summary": {
            "total_logs": 198,
            "levels": {"INFO": 26, "WARNINGS": 18, "ERRORS": 165},
            "top_services": ["Auth", "Payments", "Orders"]
        },
        "sample_predictions": [
            {
                "timestamp": "2025-10-29 09:00:00",
                "service": "Auth",
                "message": "User login attempt successful.",
                "predicted_level": "INFO"
            },
            {
                "timestamp": "2025-10-29 09:05:00",
                "service": "Payments",
                "message": "Payment gateway timeout detected.",
                "predicted_level": "ERROR"
            },
            {
                "timestamp": "2025-10-29 09:10:00",
                "service": "Orders",
                "message": "Order confirmation delay observed.",
                "predicted_level": "WARNING"
            }
        ],
        "anomalies": [
            {
                "timestamp": "2025-10-29 09:20:00",
                "service": "Inventory",
                "message": "Stock update took too long.",
                "latency": "520ms"
            }
        ]
    }
    return insights


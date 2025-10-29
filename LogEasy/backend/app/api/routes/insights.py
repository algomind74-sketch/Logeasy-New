from fastapi import APIRouter
from app.api.routes.logs import get_logs  # ✅ Import existing log endpoint (reuse logs)
import random

router = APIRouter()

@router.get("/insights")
async def get_ai_insights():
    # ✅ Get the actual logs
    logs = await get_logs()

    # ✅ Basic log summary
    total_logs = len(logs)
    level_count = {}
    service_count = {}

    for log in logs:
        level = log["level"]
        service = log["service"]
        level_count[level] = level_count.get(level, 0) + 1
        service_count[service] = service_count.get(service, 0) + 1

    top_services = sorted(service_count, key=service_count.get, reverse=True)[:3]

    # ✅ Simulate AI predictions (for now, random predictions)
    sample_predictions = []
    for log in logs[:5]:  # take top 5 logs
        sample_predictions.append({
            "timestamp": log["timestamp"],
            "service": log["service"],
            "message": log["message"],
            "predicted_level": random.choice(["INFO", "WARNING", "ERROR"])
        })

    # ✅ Simple anomaly detection (mocked)
    anomalies = []
    for log in logs:
        if log["level"] == "ERROR" and "timeout" in log["message"].lower():
            anomalies.append({
                "timestamp": log["timestamp"],
                "service": log["service"],
                "message": log["message"],
                "latency": f"{random.randint(400, 900)}ms"
            })

    return {
        "summary": {
            "total_logs": total_logs,
            "levels": level_count,
            "top_services": top_services,
        },
        "sample_predictions": sample_predictions,
        "anomalies": anomalies,
    }

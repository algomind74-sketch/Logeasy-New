from fastapi import WebSocket
from typing import List
from app.database.crud import get_recent_logs
from app.database.db_session import SessionLocal
import asyncio
import json

# Connected clients
clients: List[WebSocket] = []

# Interval for sending updates (seconds)
UPDATE_INTERVAL = 2


async def connect(websocket: WebSocket):
    """
    Accept and store a new WebSocket connection.
    """
    await websocket.accept()
    clients.append(websocket)
    print(f"✅ Client connected. Total clients: {len(clients)}")


def disconnect(websocket: WebSocket):
    """
    Remove a disconnected WebSocket client.
    """
    if websocket in clients:
        clients.remove(websocket)
        print(f"❌ Client disconnected. Total clients: {len(clients)}")


async def broadcast(data: dict):
    """
    Send data to all connected WebSocket clients.
    """
    message = json.dumps(data)
    for client in clients:
        try:
            await client.send_text(message)
        except Exception:
            disconnect(client)


async def realtime_log_updates():
    """
    Periodically fetch recent logs and broadcast to clients.
    """
    while True:
        db = SessionLocal()
        recent_logs = get_recent_logs(db, limit=10)  # Last 10 logs
        db.close()

        logs_data = [
            {"timestamp": log.created_at.isoformat(), "level": log.level, "message": log.message}
            for log in recent_logs
        ]

        await broadcast({"type": "logs_update", "logs": logs_data})
        await asyncio.sleep(UPDATE_INTERVAL)

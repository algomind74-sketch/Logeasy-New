import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

# -----------------------------
# Test Log Prediction Endpoint
# -----------------------------
def test_predict_logs():
    payload = {
        "logs": [
            "ERROR Payment failed",
            "INFO User logged in"
        ]
    }
    response = client.post("/predict", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) == 2
    for log in data:
        assert "message" in log
        assert "type" in log
        assert "anomaly" in log

# -----------------------------
# Test Cluster Logs Endpoint
# -----------------------------
def test_cluster_logs():
    payload = [
        "ERROR Payment failed",
        "ERROR Payment timeout",
        "INFO User logged in"
    ]
    response = client.post("/cluster", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "logs" in data
    assert "clusters" in data
    assert len(data["logs"]) == len(payload)
    assert len(data["clusters"]) == len(payload)

# -----------------------------
# Test Compliance Report Endpoint
# -----------------------------
def test_compliance_report():
    response = client.get("/compliance-report")
    assert response.status_code == 200
    data = response.json()
    assert "report_path" in data
    assert "message" in data

# -----------------------------
# Test PDF Report Endpoint
# -----------------------------
def test_pdf_report():
    response = client.get("/generate-pdf-report")
    assert response.status_code == 200
    data = response.json()
    assert "pdf_path" in data
    assert "message" in data

# -----------------------------
# Test WebSocket Endpoint (Optional)
# -----------------------------
@pytest.mark.asyncio
async def test_websocket_logs():
    from websockets import connect
    import asyncio

    uri = "ws://127.0.0.1:8000/ws/logs"

    async def ws_test():
        async with connect(uri) as websocket:
            # Receive initial message (if any)
            await asyncio.sleep(1)  # wait for server broadcast
            # Send a message to server
            await websocket.send("Hello server")
            # Receive server response
            msg = await websocket.recv()
            assert "logs" in msg or "type" in msg

    # Run the websocket test
    await ws_test()

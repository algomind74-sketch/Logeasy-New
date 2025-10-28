# import pandas as pd

# def load_logs(path):
#     df = pd.read_csv(path, sep="\t", names=["timestamp", "service", "level", "message", "latency"])
#     df['timestamp'] = pd.to_datetime(df['timestamp'], errors='coerce')
#     return df
#--------------------------
import pandas as pd

def load_logs(filepath: str):
    # Simulate reading logs
    data = {
        "timestamp": pd.date_range(start="2025-10-16", periods=100, freq="T"),
        "service": ["PaymentService", "AuthService", "NetworkService"] * 33 + ["Database"],
        "message": ["Transaction successful", "Login failed", "Timeout error", "Connection reset"] * 25,
        "latency": [120, 250, 500, 3200] * 25,
        "level": ["INFO", "ERROR", "WARNING", "ERROR"] * 25
    }
    df = pd.DataFrame(data)
    return df

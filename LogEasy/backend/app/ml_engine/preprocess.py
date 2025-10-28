import pandas as pd

def load_logs(path):
    df = pd.read_csv(path, sep="\t", names=["timestamp", "service", "level", "message", "latency"])
    df['timestamp'] = pd.to_datetime(df['timestamp'], errors='coerce')
    return df
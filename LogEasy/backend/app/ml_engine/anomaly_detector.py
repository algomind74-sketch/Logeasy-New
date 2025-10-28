import joblib
import pandas as pd
from sklearn.ensemble import IsolationForest
import os

MODEL_PATH = "models/trained/anomaly_model.pkl"

def train_anomaly_model(df: pd.DataFrame):
    features = df[['latency']].fillna(0)
    model = IsolationForest(contamination=0.02, random_state=42)
    model.fit(features)
    os.makedirs(os.path.dirname(MODEL_PATH), exist_ok=True)
    joblib.dump(model, MODEL_PATH)
    print("✅ Anomaly detector trained and saved.")

def detect_anomalies(df: pd.DataFrame):
    model = joblib.load(MODEL_PATH)
    preds = model.predict(df[['latency']].fillna(0))
    df['anomaly'] = preds
    anomalies = df[df['anomaly'] == -1]
    return anomalies
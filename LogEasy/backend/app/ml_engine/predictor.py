from app.ml_engine import model_utils
from typing import List, Dict

# Load models once when module is imported
CLASSIFIER_FILENAME = "log_classifier.pkl"
VECTORIZER_FILENAME = "vectorizer.pkl"
ANOMALY_FILENAME = "anomaly_model.pkl"

try:
    vectorizer = model_utils.load_model(VECTORIZER_FILENAME)
    classifier = model_utils.load_model(CLASSIFIER_FILENAME)
    anomaly_model = model_utils.load_model(ANOMALY_FILENAME)
except FileNotFoundError as e:
    print(f"Model file missing: {e}")
    vectorizer = None
    classifier = None
    anomaly_model = None


def predict_log_type(log_messages: List[str]) -> List[str]:
    """
    Predict log type (INFO, WARNING, ERROR) for a list of log messages.

    Args:
        log_messages (List[str]): List of log messages

    Returns:
        List[str]: Predicted log type for each message
    """
    if not log_messages or not classifier or not vectorizer:
        return []

    X = vectorizer.transform(log_messages)
    predictions = classifier.predict(X)
    return predictions.tolist()


def detect_anomalies(log_messages: List[str]) -> List[str]:
    """
    Detect anomalies in log messages using IsolationForest.

    Args:
        log_messages (List[str]): List of log messages

    Returns:
        List[str]: "Normal" or "Anomaly" for each message
    """
    if not log_messages or not anomaly_model or not vectorizer:
        return []

    X = vectorizer.transform(log_messages)
    preds = anomaly_model.predict(X.toarray())
    return ["Normal" if p == 1 else "Anomaly" for p in preds]


def predict(log_messages: List[str]) -> List[Dict[str, str]]:
    """
    Combined prediction: classify log type and detect anomaly.

    Args:
        log_messages (List[str]): List of log messages

    Returns:
        List[Dict[str, str]]: Each dict contains 'message', 'type', 'anomaly'
    """
    types = predict_log_type(log_messages)
    anomalies = detect_anomalies(log_messages)

    results = []
    for msg, t, a in zip(log_messages, types, anomalies):
        results.append({"message": msg, "type": t, "anomaly": a})
    return results


# Optional: test
if __name__ == "__main__":
    sample_logs = [
        "ERROR Payment failed",
        "INFO User logged in",
        "WARNING Disk space low",
        "ERROR Network timeout"
    ]

    results = predict(sample_logs)
    for r in results:
        print(r)

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.cluster import DBSCAN
import joblib
import os
import pandas as pd

# Path to saved vectorizer
VECTORIZER_PATH = "models/trained/vectorizer.pkl"

# Load vectorizer
if os.path.exists(VECTORIZER_PATH):
    vectorizer = joblib.load(VECTORIZER_PATH)
else:
    vectorizer = TfidfVectorizer(max_features=500)

def cluster_logs(log_messages, eps=0.5, min_samples=2):
    """
    Cluster log messages into groups using DBSCAN.

    Args:
        log_messages (list[str]): List of log messages (text)
        eps (float): DBSCAN eps parameter
        min_samples (int): Minimum samples per cluster

    Returns:
        list[int]: Cluster labels for each log (-1 = noise)
    """
    if not log_messages:
        return []

    # Transform logs to numeric vectors
    X = vectorizer.transform(log_messages)

    # Perform DBSCAN clustering
    db = DBSCAN(eps=eps, min_samples=min_samples, metric='cosine')
    db.fit(X)

    # Return cluster labels
    return db.labels_.tolist()


# Optional: test clustering
if __name__ == "__main__":
    sample_logs = [
        "ERROR Payment failed",
        "ERROR Payment timeout",
        "INFO User logged in",
        "WARNING Disk space low",
        "ERROR Network timeout",
        "INFO Payment success"
    ]

    labels = cluster_logs(sample_logs)
    for log, label in zip(sample_logs, labels):
        print(f"[Cluster {label}] {log}")

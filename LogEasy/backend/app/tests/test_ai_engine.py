import pytest
from app.ml_engine import predictor, clustering
from app.ml_engine.model_utils import save_model, load_model
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestClassifier, IsolationForest

# -----------------------------
# Fixtures for test models
# -----------------------------
@pytest.fixture(scope="module")
def sample_vectorizer():
    vec = TfidfVectorizer(max_features=100)
    texts = ["ERROR Payment failed", "INFO User logged in"]
    vec.fit(texts)
    save_model(vec, "test_vectorizer.pkl")
    return vec

@pytest.fixture(scope="module")
def sample_classifier(sample_vectorizer):
    clf = RandomForestClassifier(n_estimators=10, random_state=42)
    X = sample_vectorizer.transform(["ERROR Payment failed", "INFO User logged in"])
    y = ["ERROR", "INFO"]
    clf.fit(X, y)
    save_model(clf, "test_classifier.pkl")
    return clf

@pytest.fixture(scope="module")
def sample_anomaly_model(sample_vectorizer):
    X = sample_vectorizer.transform(["ERROR Payment failed", "INFO User logged in"])
    anomaly_model = IsolationForest(contamination=0.1, random_state=42)
    anomaly_model.fit(X.toarray())
    save_model(anomaly_model, "test_anomaly_model.pkl")
    return anomaly_model

# -----------------------------
# Tests
# -----------------------------
def test_predict_log_type(monkeypatch, sample_vectorizer, sample_classifier):
    # Monkeypatch predictor models with test models
    monkeypatch.setattr(predictor, "vectorizer", sample_vectorizer)
    monkeypatch.setattr(predictor, "classifier", sample_classifier)
    
    logs = ["ERROR Payment failed", "INFO User logged in"]
    preds = predictor.predict_log_type(logs)
    assert preds == ["ERROR", "INFO"]

def test_detect_anomalies(monkeypatch, sample_vectorizer, sample_anomaly_model):
    monkeypatch.setattr(predictor, "vectorizer", sample_vectorizer)
    monkeypatch.setattr(predictor, "anomaly_model", sample_anomaly_model)
    
    logs = ["ERROR Payment failed", "INFO User logged in"]
    preds = predictor.detect_anomalies(logs)
    assert all(p in ["Normal", "Anomaly"] for p in preds)

def test_predict_combined(monkeypatch, sample_vectorizer, sample_classifier, sample_anomaly_model):
    monkeypatch.setattr(predictor, "vectorizer", sample_vectorizer)
    monkeypatch.setattr(predictor, "classifier", sample_classifier)
    monkeypatch.setattr(predictor, "anomaly_model", sample_anomaly_model)
    
    logs = ["ERROR Payment failed", "INFO User logged in"]
    results = predictor.predict(logs)
    
    assert len(results) == 2
    for res in results:
        assert "message" in res
        assert "type" in res
        assert "anomaly" in res
        assert res["type"] in ["ERROR", "INFO", "WARNING"]
        assert res["anomaly"] in ["Normal", "Anomaly"]

def test_clustering():
    logs = [
        "ERROR Payment failed",
        "ERROR Payment timeout",
        "INFO User logged in"
    ]
    labels = clustering.cluster_logs(logs, eps=0.5, min_samples=1)
    assert len(labels) == len(logs)
    assert isinstance(labels[0], int)

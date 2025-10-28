from fastapi import APIRouter
from backend.app.services import fetcher, analyzer
from backend.app.ml_engine import classifier, anomaly_detector
from backend.app.ml_engine import preprocess

router = APIRouter()

@router.get("/insights")
def get_ai_insights():
    df = preprocess.load_logs("data/sample_logs/simulated.log")
    summary = analyzer.summarize_logs(df)
    classified = classifier.classify_logs(df)
    anomalies = anomaly_detector.detect_anomalies(df)
    return {
        "summary": summary,
        "sample_predictions": classified.head(5).to_dict(orient="records"),
        "anomalies": anomalies.head(5).to_dict(orient="records")
    }
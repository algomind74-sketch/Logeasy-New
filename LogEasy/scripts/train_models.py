from backend.app.ml_engine import preprocess, classifier, anomaly_detector

def main():
    df = preprocess.load_logs("data/sample_logs/simulated.log")
    classifier.train_log_classifier(df)
    anomaly_detector.train_anomaly_model(df)
    print("✅ All models trained successfully!")

if _name_ == "_main_":
    main()
# from backend.app.ml_engine import preprocess, classifier, anomaly_detector

def main():
    # Load sample log data
    df = preprocess.load_logs("data/sample_logs/simulated.log")

    # Train the models
    classifier.train_log_classifier(df)
    anomaly_detector.train_anomaly_model(df)

    print("✅ All models trained successfully!")

if __name__ == "__main__":
    main()

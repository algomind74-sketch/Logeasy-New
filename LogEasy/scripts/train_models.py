# from backend.app.ml_engine import preprocess, classifier, anomaly_detector

# def main():
#     df = preprocess.load_logs("data/sample_logs/simulated.log")
#     classifier.train_log_classifier(df)
#     anomaly_detector.train_anomaly_model(df)
#     print("✅ All models trained successfully!")

# if _name_ == "_main_":
#     main()
#---------------------------
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestClassifier, IsolationForest
import joblib
from app.ml_engine.preprocess import clean_logs
import os

DATA_PATH = "data/sample_logs/"

def load_data():
    # Example: read all log files into a DataFrame
    logs = []
    for file in os.listdir(DATA_PATH):
        if file.endswith(".log"):
            with open(os.path.join(DATA_PATH, file)) as f:
                for line in f:
                    logs.append(line.strip())
    df = pd.DataFrame(logs, columns=["message"])
    return df

def train_classifier(df):
    df = clean_logs(df)
    df['label'] = df['message'].apply(lambda x: "ERROR" if "error" in x.lower() else "INFO")
    vectorizer = TfidfVectorizer(max_features=500)
    X = vectorizer.fit_transform(df['message'])
    y = df['label']
    clf = RandomForestClassifier(n_estimators=100)
    clf.fit(X, y)
    
    # Save models
    os.makedirs("models/trained", exist_ok=True)
    joblib.dump(clf, "models/trained/log_classifier.pkl")
    joblib.dump(vectorizer, "models/trained/vectorizer.pkl")
    print("Log classifier and vectorizer saved.")

def train_anomaly_detector(df):
    df = clean_logs(df)
    vectorizer = TfidfVectorizer(max_features=500)
    X = vectorizer.fit_transform(df['message'])
    anomaly_model = IsolationForest(contamination=0.05, random_state=42)
    anomaly_model.fit(X.toarray())
    joblib.dump(anomaly_model, "models/trained/anomaly_model.pkl")
    print("Anomaly detector saved.")

if __name__ == "__main__":
    df = load_data()
    train_classifier(df)
    train_anomaly_detector(df)

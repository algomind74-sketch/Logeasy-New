
import joblib

class LogClassifier:
    def __init__(self, model_path="models/trained/log_classifier.pkl"):
        self.model = joblib.load(model_path)
    
    def predict(self, messages):
        return self.model.predict(messages)

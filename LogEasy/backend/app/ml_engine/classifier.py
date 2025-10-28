# import joblib
# from sklearn.feature_extraction.text import TfidfVectorizer
# from sklearn.naive_bayes import MultinomialNB
# import pandas as pd
# import os

# MODEL_PATH = "models/trained/log_classifier.pkl"
# VECTORIZER_PATH = "models/trained/vectorizer.pkl"

# def train_log_classifier(df: pd.DataFrame):
#     X = df['message']
#     y = df['level']

#     vectorizer = TfidfVectorizer(max_features=5000)
#     X_vec = vectorizer.fit_transform(X)

#     model = MultinomialNB()
#     model.fit(X_vec, y)

#     os.makedirs(os.path.dirname(MODEL_PATH), exist_ok=True)
#     joblib.dump(model, MODEL_PATH)
#     joblib.dump(vectorizer, VECTORIZER_PATH)
#     print("✅ Log classifier trained and saved.")

# def classify_logs(df: pd.DataFrame):
#     model = joblib.load(MODEL_PATH)
#     vectorizer = joblib.load(VECTORIZER_PATH)

#     X_vec = vectorizer.transform(df['message'])
#     preds = model.predict(X_vec)
#     df['predicted_level'] = preds
#     return df
#--------------------------
import joblib

class LogClassifier:
    def __init__(self, model_path="models/trained/log_classifier.pkl"):
        self.model = joblib.load(model_path)
    
    def predict(self, messages):
        return self.model.predict(messages)

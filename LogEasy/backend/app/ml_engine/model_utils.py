import joblib
import os

MODEL_DIR = "models/trained/"

def save_model(model, filename: str):
    """
    Save a trained ML model or vectorizer to disk.

    Args:
        model: Trained ML model or vectorizer
        filename (str): Filename to save under models/trained/
    """
    os.makedirs(MODEL_DIR, exist_ok=True)
    path = os.path.join(MODEL_DIR, filename)
    joblib.dump(model, path)
    print(f"✅ Saved model: {path}")


def load_model(filename: str):
    """
    Load a trained ML model or vectorizer from disk.

    Args:
        filename (str): Filename to load from models/trained/

    Returns:
        The loaded model object
    """
    path = os.path.join(MODEL_DIR, filename)
    if not os.path.exists(path):
        raise FileNotFoundError(f"Model file not found: {path}")
    model = joblib.load(path)
    return model


def list_models():
    """
    List all saved models in the trained models directory.

    Returns:
        List[str]: Filenames of all saved models
    """
    if not os.path.exists(MODEL_DIR):
        return []
    return [f for f in os.listdir(MODEL_DIR) if f.endswith((".pkl", ".joblib"))]


# Optional: test functionality
if __name__ == "__main__":
    from sklearn.ensemble import RandomForestClassifier
    from sklearn.feature_extraction.text import TfidfVectorizer

    # Example usage
    clf = RandomForestClassifier()
    vec = TfidfVectorizer()

    save_model(clf, "test_classifier.pkl")
    save_model(vec, "test_vectorizer.pkl")

    loaded_clf = load_model("test_classifier.pkl")
    loaded_vec = load_model("test_vectorizer.pkl")

    print("Saved models:", list_models())

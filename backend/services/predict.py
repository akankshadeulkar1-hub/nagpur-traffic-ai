"""
Nagpur Traffic AI Backend - Prediction Service (services/predict.py)
--------------------------------------------------------------------
Purpose: Loads the ML risk scorer model if available, or generates dynamic risk scores for junctions.
"""

import os
import pickle
import random
from pathlib import Path

# Relative path candidates to find risk_scorer.pkl
BASE_DIR = Path(__file__).resolve().parent
MODEL_CANDIDATE_PATHS = [
    BASE_DIR.parent.parent / "ai_engine" / "risk_scorer.pkl",
    BASE_DIR.parent / "ai_engine" / "risk_scorer.pkl",
    Path("../ai_engine/risk_scorer.pkl"),
    Path("ai_engine/risk_scorer.pkl"),
]

_cached_model = None

def load_model():
    """
    Attempts to load the ML risk scorer model from ../ai_engine/risk_scorer.pkl.
    Uses try/except block to handle missing or incompatible model files gracefully.
    Returns the loaded model object or None.
    """
    global _cached_model
    if _cached_model is not None:
        return _cached_model

    for model_path in MODEL_CANDIDATE_PATHS:
        try:
            if model_path.exists():
                with open(model_path, "rb") as f:
                    _cached_model = pickle.load(f)
                    print(f"Successfully loaded model from {model_path}")
                    return _cached_model
        except Exception as e:
            print(f"Attempted loading model from {model_path} failed: {e}")

    return None

def get_risk_score(junction_data: dict) -> float:
    """
    Calculates the risk score (0-100) for a traffic junction.
    If the ML model is missing or fails, returns a random mock risk score (0-100).
    """
    model = load_model()

    if model is not None:
        try:
            # Placeholder logic for when AI team delivers risk_scorer.pkl
            if isinstance(junction_data, dict):
                # e.g., features = extract_features(junction_data)
                # return float(model.predict([features])[0])
                pass
        except Exception as e:
            print(f"Error executing ML model prediction: {e}")

    # Fallback: AI team hasn't finished model yet -> return mock risk score (0-100)
    return round(random.uniform(10.0, 95.0), 1)

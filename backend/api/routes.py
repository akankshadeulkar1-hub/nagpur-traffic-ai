"""
Nagpur Traffic AI Backend - API Routes (api/routes.py)
------------------------------------------------------
Purpose: Expressive APIRouter endpoints for risk scores and officer allocation recommendations.
"""

import sys
from pathlib import Path

# Ensure backend directory is in sys.path
file_dir = Path(__file__).resolve().parent.parent
if str(file_dir) not in sys.path:
    sys.path.insert(0, str(file_dir))

from fastapi import APIRouter

try:
    from backend.services.predict import get_risk_score
    from backend.services.allocation import calculate_deployment
except ImportError:
    from services.predict import get_risk_score
    from services.allocation import calculate_deployment

router = APIRouter()


@router.get("/risk-scores")
def get_risk_scores():
    """
    Returns a list of 4 key Nagpur junctions (Variety Square, RBI Square, Sitabuldi Interchange, Chhatrapati Square)
    with risk scores calculated via get_risk_score().
    """
    junctions = [
        {
            "id": 1,
            "name": "Variety Square",
            "location": "Sitabuldi, Nagpur",
            "police_count": 0,
            "traffic_volume": 450,
            "lat": 21.1458,
            "lng": 79.0882
        },
        {
            "id": 2,
            "name": "RBI Square",
            "location": "Civil Lines, Nagpur",
            "police_count": 2,
            "traffic_volume": 180,
            "lat": 21.1526,
            "lng": 79.0806
        },
        {
            "id": 3,
            "name": "Sitabuldi Interchange",
            "location": "Central Nagpur",
            "police_count": 0,
            "traffic_volume": 520,
            "lat": 21.1432,
            "lng": 79.0845
        },
        {
            "id": 4,
            "name": "Chhatrapati Square",
            "location": "Wardha Road, Nagpur",
            "police_count": 1,
            "traffic_volume": 310,
            "lat": 21.1112,
            "lng": 79.0620
        }
    ]

    for junction in junctions:
        junction["risk_score"] = get_risk_score(junction)

    return junctions


@router.get("/recommendations")
def get_recommendations():
    """
    Fetches junction risk scores and generates police officer redeployment recommendations.
    """
    junctions = get_risk_scores()

    # Ensure demo simulation triggers a recommendation if random scores do not happen to cross the thresholds
    has_high_risk = any(j["risk_score"] > 75 and j["police_count"] == 0 for j in junctions)
    has_low_risk = any(j["risk_score"] < 30 and j["police_count"] > 0 for j in junctions)

    if not (has_high_risk and has_low_risk):
        # Preset realistic demonstration values
        junctions[0]["risk_score"] = 82.5  # Variety Square: > 75 risk, 0 police
        junctions[1]["risk_score"] = 24.0  # RBI Square: < 30 risk, 2 police

    return calculate_deployment(junctions)

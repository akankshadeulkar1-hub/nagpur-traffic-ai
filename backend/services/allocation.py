"""
Nagpur Traffic AI Backend - Allocation Service (services/allocation.py)
-----------------------------------------------------------------------
Purpose: Simulates optimization for police officer deployment across Nagpur traffic junctions.
"""

def calculate_deployment(junctions_list: list) -> dict:
    """
    Simulates finding junctions with high risk (> 75) and 0 police officers,
    and recommends re-allocating an officer from a low risk (< 30) junction with > 0 police.

    Returns the recommendation details along with an explanatory message.
    """
    high_risk_needing_police = []
    low_risk_surplus_police = []

    for j in junctions_list:
        risk = j.get("risk_score", 0)
        police = j.get("police_count", j.get("police", 0))

        if risk > 75 and police == 0:
            high_risk_needing_police.append(j)
        elif risk < 30 and police > 0:
            low_risk_surplus_police.append(j)

    recommendations = []

    for target_j in high_risk_needing_police:
        if low_risk_surplus_police:
            source_j = low_risk_surplus_police.pop(0)
            rec = {
                "from_junction": source_j.get("name"),
                "from_junction_id": source_j.get("id"),
                "to_junction": target_j.get("name"),
                "to_junction_id": target_j.get("id"),
                "officers_to_move": 1,
                "explanation": (
                    f"Recommend moving 1 officer from '{source_j.get('name')}' "
                    f"(Risk: {source_j.get('risk_score')}%, Officers: {source_j.get('police_count', 0)}) "
                    f"to '{target_j.get('name')}' (Risk: {target_j.get('risk_score')}%, Officers: {target_j.get('police_count', 0)}) "
                    f"to manage critical traffic congestion."
                )
            }
            recommendations.append(rec)

    return {
        "total_high_risk_unmanned": len(high_risk_needing_police),
        "total_recommendations": len(recommendations),
        "recommendations": recommendations,
        "summary": (
            f"Generated {len(recommendations)} officer redeployment recommendation(s) based on real-time junction risk levels."
            if recommendations
            else "Traffic distribution is currently stable; no immediate officer redeployments required."
        )
    }

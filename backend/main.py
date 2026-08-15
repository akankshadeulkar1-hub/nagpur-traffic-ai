"""
Nagpur Traffic AI Backend - Main Server Entry Point (main.py)
-------------------------------------------------------------
Purpose: The main FastAPI server entry point providing API endpoints for traffic risk scores,
officer allocation strategies, and system health status.
"""

from fastapi import FastAPI

app = FastAPI(
    title="Nagpur Traffic AI Command System API",
    description="FastAPI Backend for Nagpur Traffic Command & Control System",
    version="1.0.0"
)

@app.get("/")
def read_root():
    return {"message": "Hello World from Nagpur Traffic AI Backend"}

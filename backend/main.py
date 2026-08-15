"""
Nagpur Traffic AI Backend - Main Server Entry Point (main.py)
-------------------------------------------------------------
Purpose: Sets up the FastAPI app, configures CORS middleware, and includes API routers.
"""

import sys
from pathlib import Path

# Ensure backend directory and root directory are in sys.path for foolproof imports
file_dir = Path(__file__).resolve().parent
if str(file_dir) not in sys.path:
    sys.path.insert(0, str(file_dir))
if str(file_dir.parent) not in sys.path:
    sys.path.insert(0, str(file_dir.parent))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Import router with fallback to support both absolute and module-style executions
try:
    from backend.api.routes import router as api_router
except ImportError:
    from api.routes import router as api_router

app = FastAPI(
    title="Nagpur Traffic AI - Command Center API",
    description="FastAPI Backend for Nagpur Traffic Command & Control System",
    version="1.0.0"
)

# CORS middleware configured to allow all origins for React frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API router under /api prefix
app.include_router(api_router, prefix="/api")


@app.get("/")
def read_root():
    return {
        "status": "online",
        "service": "Nagpur Traffic AI Backend",
        "version": "1.0.0",
        "docs": "/docs"
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

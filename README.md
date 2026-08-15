# 🚦 Nagpur AI-Based Traffic Command System (`nagpur-traffic-ai`)

An intelligent AI-powered traffic command and control dashboard for Nagpur city, designed to monitor real-time traffic congestion, predict risk scores across major junctions, and dynamically optimize traffic police resource allocation.

## 📁 Repository Structure

```
nagpur-traffic-ai/
│
├── data/                       # 🗄️ Phase 1: Traffic dataset storage (CSVs)
│   └── nagpur_traffic_data.csv # Synthetic traffic dataset for Nagpur junctions
│
├── ai_engine/                  # 🧠 Phase 2: AI models and data generation
│   ├── generate_data.py        # Script to generate synthetic Nagpur traffic data
│   ├── train_model.py          # Script to train Scikit-Learn traffic risk model
│   └── risk_scorer.pkl         # Saved machine learning model binary
│
├── backend/                    # ⚙️ Python FastAPI Backend API Server
│   ├── main.py                 # FastAPI application entry point ("Hello World")
│   ├── requirements.txt        # Python package dependencies
│   ├── api/                    
│   │   └── routes.py           # REST API routes (/get-risk-scores, /allocate)
│   └── services/               
│       ├── allocation.py       # Optimization engine for officer allocation (SciPy)
│       └── predict.py          # Real-time risk scoring engine
│
├── frontend/                   # 💻 Phase 3 & 4: React + Vite Control Dashboard
│   ├── package.json            # Node.js dependencies (React, Leaflet, Lucide)
│   ├── index.html              # HTML entry page
│   ├── vite.config.js          # Vite build & server configuration
│   └── src/                    
│       ├── App.jsx             # Main dashboard layout
│       ├── main.jsx            # React root renderer
│       └── components/         
│           ├── TrafficMap.jsx  # Leaflet interactive map & heatmap visualization
│           ├── Alerts.jsx      # Recommendation UI for dispatch & rerouting
│           └── Metrics.jsx     # Deployment vs efficiency metric comparison charts
│
└── README.md                   # Project description and setup instructions
```

## 🚀 Getting Started

### Backend Setup
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

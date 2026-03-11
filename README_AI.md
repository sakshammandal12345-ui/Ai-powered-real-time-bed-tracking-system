# 🤖 AI Integration Guide
### What was built, how it works, and how to run it
> no AI/ML background needed to understand this

---

## 👋 First — What Is This?

This project now has a **real AI brain** connected to the dashboard.

When you open the dashboard, it doesn't show fake hardcoded numbers anymore. It calls a Python AI server running on your laptop, which uses trained machine learning models to predict how many hospital beds will be occupied — and whether the situation is critical.

Everything you see on the **AI Live Banner** and the **Forecast Tab** comes from real AI predictions.

---

## 📁 Two Separate Parts

This project now has two folders that work together:

```
Folder 1 — React Frontend (you already know this)
D:\bed track\Ai-powered-real-time-bed-tracking-system\

Folder 2 — AI Backend (new — this is what I built)
D:\FastAPI.python\
├── main.py           → the AI server
├── bed_model.pkl     → trained AI model (predicts bed numbers)
└── alert_model.pkl   → trained AI model (predicts critical alerts)
```

They are separate folders but they talk to each other through the network — like how your browser talks to a website.

---

## 🔗 How They Talk to Each Other

Think of it like this:

```
You open the dashboard in browser
        ↓
React says: "Hey AI, how many beds are occupied right now?"
        ↓
FastAPI server receives the question
        ↓
AI models calculate the answer
        ↓
FastAPI replies: "91 beds occupied, 36% occupancy, NORMAL risk"
        ↓
React shows those numbers on screen
        ↓
This repeats every 5 minutes automatically
```

The React code that does this is in `Dashboard.jsx` — look for the `useEffect` block that contains `fetch('http://127.0.0.1:8000/...')`. That's where React calls the AI server.

`127.0.0.1` just means "this same laptop" — no internet needed.

---

## 🧠 The AI Models — Simply Explained

I trained 3 machine learning models using Python. Here's what each one does in plain English:

---

### Model 1 — Random Forest (the main predictor)
**What it does:** Predicts how many beds will be occupied at any given hour.

**How to think about it:** Imagine asking 100 doctors "how busy will the hospital be at 2PM on Monday?" Each doctor gives their own answer. You take the average. That's Random Forest — 100 decision trees, averaged together.

**Result:** Predicts within ±4.2 beds accuracy.

**Example:**
```
You ask:  "What's occupancy at 1PM on a Monday?"
It says:  "91 beds occupied out of 247"
```

---

### Model 2 — Logistic Regression (the alert system)
**What it does:** Decides if a situation is CRITICAL or NORMAL, and gives a risk percentage.

**How to think about it:** It's like a doctor saying "based on the time, day, and current occupancy — there's an 85% chance this becomes critical in the next hour."

**Result:** 96.1% accurate at catching critical situations.

**Example:**
```
You ask:  "Is 1PM on a festival Monday dangerous?"
It says:  "CRITICAL — 85% risk"

You ask:  "Is 8AM on a quiet Sunday dangerous?"
It says:  "NORMAL — 3% risk"
```

---

### Model 3 — Linear Regression (kept for comparison only)
**What it does:** Same job as Random Forest but less accurate (±13.4 beds).

**Why it's included:** To show judges that we tested multiple approaches and chose the best one. Random Forest is 3× more accurate.

---

## 📡 The AI Server — 2 Endpoints

The AI server (`main.py`) has two URLs you can call:

---

### `/predict` — answers for RIGHT NOW

```
http://127.0.0.1:8000/predict?hour=13&day=0&is_weekend=0&is_festival=0
```

Gives prediction for one specific hour. Used by the **AI Live Banner** at the top of the dashboard.

**Returns:**
```json
{
  "occupied": 91,
  "available": 156,
  "occupancy_pct": 36.8,
  "alert": "NORMAL",
  "alert_probability": 0.4
}
```

---

### `/forecast` — answers for the WHOLE DAY

```
http://127.0.0.1:8000/forecast?day=0&is_weekend=0&is_festival=0
```

Gives predictions for every hour from 6AM to 11PM (18 hours). Used by the **Forecast Tab** charts.

**Returns:**
```json
{
  "forecast": [
    { "hour": 6,  "occupied": 49, "available": 198, "alert_probability": 0.7 },
    { "hour": 9,  "occupied": 80, "available": 167, "alert_probability": 0.5 },
    { "hour": 13, "occupied": 91, "available": 156, "alert_probability": 0.4 },
    { "hour": 18, "occupied": 53, "available": 194, "alert_probability": 0.2 }
  ]
}
```

**Parameters explained:**
```
hour       → 6 to 23 (6AM to 11PM)
day        → 0=Monday, 1=Tuesday ... 6=Sunday
is_weekend → 1 if Saturday or Sunday, otherwise 0
is_festival→ 1 during festival periods, otherwise 0
```

---

## 🎨 What's Real AI Data vs What's Still Mock

Not everything on the dashboard is from AI — here's the breakdown:

| What you see | Where data comes from |
|---|---|
| AI Banner — occupied/available numbers | ✅ Real AI (FastAPI) |
| AI Banner — occupancy %, peak hour | ✅ Real AI (FastAPI) |
| Forecast Tab — all charts | ✅ Real AI (FastAPI) |
| Forecast Tab — bed allocation recommendation | ✅ Real AI (FastAPI) |
| Emergency Alert — fires only when truly critical | ✅ Real AI (FastAPI) |
| Forecast Tab — Nearby Hospitals list | 📋 Mock data (static) |
| Ward View — bed grid | 📋 Mock data (needs MongoDB) |

**Important:** If the FastAPI server is not running, the dashboard automatically falls back to mock data silently. It won't crash or show errors to the user.

---

## 🗂️ Files I Added or Changed

### New files I created:
```
D:\FastAPI.python\main.py
→ The AI server. Run this with uvicorn.

D:\FastAPI.python\bed_model.pkl
→ The trained Random Forest model. Don't delete this.

D:\FastAPI.python\alert_model.pkl
→ The trained Logistic Regression model. Don't delete this.

src\components\ai\AILiveBanner.jsx
→ The dark banner at the top of dashboard showing live AI stats.

src\components\ai\ForecastSection.jsx
→ The wrapper component for the Forecast tab with the live header.
```

### Files I modified:
```
src\pages\Dashboard.jsx
→ Added useEffect that fetches from FastAPI every 5 minutes.
→ Added AILiveBanner component at the top.
→ Changed forecast section to use ForecastSection component.
→ Added aiData and aiLoading state variables.
```

---

## ▶️ How to Run Everything Together

You need **two terminals open at the same time.**

**Terminal 1 — Start the AI server:**
```bash
cd D:\FastAPI.python
uvicorn main:app --reload
```
Wait until you see: `Application startup complete`

**Terminal 2 — Start the React app:**
```bash
cd "D:\bed track\Ai-powered-real-time-bed-tracking-system"
npm run dev
```

**Then open browser:**
```
http://localhost:5173
```

---

## 🔍 Want to Test the AI Directly?

Open this in your browser while FastAPI is running:
```
http://127.0.0.1:8000/docs
```

You'll see an interactive page where you can type in any hour and day and see exactly what the AI predicts. Great for demos and testing.

---

## ⚠️ Important Notes for Teammates

**1 — Don't delete the .pkl files**
`bed_model.pkl` and `alert_model.pkl` are the trained AI brains. If you delete them the server crashes. They live in `D:\FastAPI.python\`.

**2 — FastAPI must be running for AI features to work**
If you open the dashboard without starting FastAPI first, it falls back to mock data automatically. No crash — but no real AI either.

**3 — The AI server runs on port 8000**
React runs on port 5173. Make sure nothing else is using port 8000 on your laptop.

**4 — Installing dependencies on a new laptop**
If someone else runs this project on a different laptop, they need to install:
```bash
pip install fastapi uvicorn pandas scikit-learn numpy
```

---

## 📊 Training Data — Where It Came From

The AI was trained on **3,240 rows of synthetic data** generated to model realistic Nepali district hospital patterns. Real BPKIHS data requires ethics approval — this synthetic data captures the same patterns:

- Morning rush (9AM–12PM) → higher occupancy
- Peak afternoon (12PM–3PM) → highest occupancy
- Evening drop (6PM+) → lower occupancy
- Weekends → 20% quieter than weekdays
- Festival periods → 30% busier than normal

The system is ready to retrain on real hospital data the moment it becomes available — just replace the training data and run the training script again.

---

*AI/ML Integration — HSIL Hackathon 2026*
*Trained on 3,240 rows · Random Forest ±4.2 MAE · Alert Accuracy 96.1%*

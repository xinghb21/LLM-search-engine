# Full Search Behavior Logger

This project combines:

- ✅ React + Vite front-end (with site selector and iframe)
- ✅ Node.js backend (with SQLite database)
- ✅ Real-time user event logging (mousemove, click, scroll)

---

## 🚀 Quick Start

### 1. Backend (Node.js + SQLite)

```bash
cd backend
npm install
node server.js
```

SQLite DB: `logs.db` will be created on first run.

---

### 2. Frontend (React + Vite)

```bash
cd frontend/my-app
npm install
npm run dev
```

Visit: [http://localhost:5173](http://localhost:5173)

---

## 🧪 Features

- Site selection dropdown (Bilibili, Wikipedia, Baidu, Perplexity)
- Embedded iframe with scroll, click, and movement logging
- All data sent to backend and stored in SQLite

---

## 📊 Data Schema

Table: `behavior`

- session_id (TEXT)
- event_type (TEXT)
- x (INTEGER)
- y (INTEGER)
- timestamp (TEXT)

Use `sqlite3 logs.db` to inspect or export.

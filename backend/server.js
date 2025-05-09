const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('./logs.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS behavior (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    session_id TEXT,
    event_type TEXT,
    x INTEGER,
    y INTEGER,
    timestamp TEXT
  )`);
});

app.post('/api/log', (req, res) => {
  const { sessionId, events } = req.body;
  const stmt = db.prepare('INSERT INTO behavior (session_id, event_type, x, y, timestamp) VALUES (?, ?, ?, ?, ?)');
  events.forEach(e => {
    const x = e.x || 0, y = e.y || 0;
    stmt.run(sessionId, e.type, x, y, new Date().toISOString());
  });
  stmt.finalize();
  res.sendStatus(200);
});

app.listen(3001, () => console.log('Server running on http://localhost:3001'));
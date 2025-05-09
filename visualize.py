import sqlite3
import pandas as pd
import matplotlib.pyplot as plt

# --- 1. Load data from logs.db ---
conn = sqlite3.connect('backend/logs.db')  # adjust path if needed
df = pd.read_sql_query("SELECT * FROM behavior", conn)
conn.close()

# --- 2. Preprocess timestamps ---
df['timestamp'] = pd.to_datetime(df['timestamp'])

# --- 3. Filter optional ---
session = df['session_id'].iloc[0]  # choose a session to visualize
df = df[df['session_id'] == session]

# --- 4. Click Heatmap ---
plt.figure(figsize=(10, 6))
clicks = df[df['event_type'] == 'click']
plt.title(f"Click Positions (Session: {session})")
plt.scatter(clicks['x'], clicks['y'], alpha=0.6, c='red', label='clicks')
plt.xlabel("X Position")
plt.ylabel("Y Position")
plt.gca().invert_yaxis()
plt.grid(True)
plt.legend()
plt.tight_layout()
plt.savefig("click_scatter.png")
plt.close()

# --- 5. Mouse Path ---
moves = df[df['event_type'] == 'mousemove']
plt.figure(figsize=(10, 6))
plt.plot(moves['x'], moves['y'], alpha=0.5, color='blue')
plt.title(f"Mouse Path (Session: {session})")
plt.xlabel("X")
plt.ylabel("Y")
plt.gca().invert_yaxis()
plt.grid(True)
plt.tight_layout()
plt.savefig("mouse_path.png")
plt.close()

# --- 6. Event Distribution Over Time ---
df['minute'] = df['timestamp'].dt.floor('min')
event_counts = df.groupby(['minute', 'event_type']).size().unstack(fill_value=0)

event_counts.plot(kind='bar', stacked=True, figsize=(12, 6))
plt.title(f"Event Types Over Time (Session: {session})")
plt.xlabel("Time (by minute)")
plt.ylabel("Count")
plt.tight_layout()
plt.savefig("event_over_time.png")

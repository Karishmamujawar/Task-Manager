import sqlite3

conn = sqlite3.connect('database.db')
cur = conn.cursor()

cur.execute(''' 
    CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
            description TEXT,
            completed BOOLEAN NOT NULL CHECK (completed IN (0,1)) DEFAULT 0    
    ) 
''')

conn.commit()
conn.close()

from flask import Flask,flash, request,jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

#connection to db
def db_connection():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    return conn

#get all tasks
@app.route('/tasks',methods=['GET'])
def get_tasks():
    #return "hello welcome to flask"
    conn = db_connection()
    task = conn.execute("select * from tasks").fetchall()
    conn.close()
    return jsonify([dict(t) for t in task]) 


#create new tasks
@app.route('/tasks',methods=['POST'])
def create_task():
    data = request.get_json()
    title = data.get('title')
    description = data.get('description')
    conn = db_connection()
    conn.execute("insert into tasks (title, description) values(?,?)", (title,description))
    conn.commit()
    conn.close()
    return {'message': 'Task created'}, 201


#delete tasks
@app.route('/tasks/<int:id>', methods=['DELETE'])
def delete_task(id):
    conn = db_connection()
    conn.execute('DELETE FROM tasks WHERE id = ?', (id,))
    conn.commit()
    conn.close()
    return {"message" : "Task deleted "}


#update tasks
@app.route('/tasks/<int:id>', methods=['PUT'])
def update_task(id):
    data = request.get_json()
    title = data.get('title')
    description = data.get('description')
    conn = db_connection()
    conn.execute("update tasks set title = ?, description = ? where id = ?", (title,description,id)) 
    conn.commit()
    conn.close()
    return {"message" : "Task updated'"}

if __name__ == '__main__':
    app.run(debug=True)
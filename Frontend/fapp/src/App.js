
import React, {useEffect, useState} from 'react';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css';

const API = "http://127.0.0.1:5000/tasks";

function App() {

const [task, setTask] = useState([]);
const [title, setTitle] = useState('');
const [description, setDescription] = useState('');
const [editTask, setEditTask] = useState(null);
const [message, setMessage] = useState('');
const [alertType, setAlertType ] = useState('');

const fetchTasks = async () => {
  const res = await axios.get(API);
  setTask(res.data)
} 

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
  if(editTask) {
    await axios.put(`${API}/${editTask.id}`,{
      title,
      description
    });
    setMessage('Task updated Successfully.')
    setAlertType('success')
    setEditTask(null);
  } else {
  await axios.post(API,{title,description});
  setMessage('Task added Successfully!!!.')
  setAlertType('success')
  }
  setTitle('');
  setDescription('');
  fetchTasks();
} catch (error) {
  setMessage('Something went wrong!');
  setAlertType('danger');
 }
};

const handleDelete = async(id) => {
  try {

  await axios.delete(`${API}/${id}`);
  setMessage('Task deleted successfully!');
  setAlertType('success');
  fetchTasks();
  
  } catch (error) {
    setMessage('Failed to delete task!');
    setAlertType('danger');
  }
};


const handleEdit = async(task) => {
    setEditTask(task)
    setTitle(task.title);
    setDescription(task.description);
};


useEffect(() => {
  fetchTasks();
},[]);



  return (
    <div class='row'>
    <div class='col-5 mx-auto mb-3'>
      <h2>Task Manager</h2>
    {message && (
      <div className={`alert alert-${alertType} alert-dismissible fade show`} role="alert">
      {message }
      <button type='button' className='btn-close' onClick={() => setMessage('')}></button>
      </div>
    )}



      <form onSubmit={handleSubmit}>

    <div class='form-group mb-3'>
    <label>Title</label>
      <input
      type="text"
      name="title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      placeholder="Task Title"
      class="form-control"
      required
    />
    </div>

    <div class='form-group mb-3'>
    <label>Description</label>
        <input type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          class="form-control"
        />

    </div>    
        <button type="submit" value='Submit' class='btn btn-primary'>{editTask ? 'Update Task' : 'Add Task'}</button>
      </form>
      
    <h3 class='text-center text-muted mb-3'>View All Tasks</h3>
    <table class='table table-bordered'>
    <thead>
      <th>Id no</th>
      <th>Title</th>
      <th>Description</th>
      <th style={{margin: '16px'}}>Action</th>
      
    </thead>
    <tbody>
    {task.map(t => (
    <tr>
        <td>{t.id}</td>
        <td>{t.title}</td>
        <td>{t.description}</td>
        <td class='btn btn-primary' onClick={() => handleEdit(t)}>Edit</td>
        <td class='btn btn-danger' onClick={() => handleDelete(t.id)} >Delete</td>
    </tr>
  ))}
    </tbody> 
    </table>
    </div>
    </div>
  );
}

export default App;

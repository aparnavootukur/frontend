import React, { useState } from 'react';
import axios from 'axios';
import '../../App.css'
import { useNavigate } from 'react-router-dom';


const TaskForm = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('pending');
  const [category, setCategory] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
     const response= await axios.post('http://localhost:5000/api', { title, description, dueDate, status, category }, {
        headers: { Authorization: `${token}` }
      });
    //  fetchTasks(); 
      if(response.status===200)
        {
           navigate('/list')
        }
    } catch (err) {
      console.error(err)
     showAlert(err.response.data.msg)
    }
  };
  const showAlert = (message) => {
    alert(JSON.stringify(message)); 
  };

  return (
    <div>
      <h1 className='heading'>Add Task page</h1>
      <div className='form-container'>
        <form onSubmit={handleSubmit} className='my-form'>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label>Description:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label>Due Date:</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>
      <div>
        <label>Status:</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <div>
        <label>Category:</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>
      <button type="submit">Add Task</button>
    </form>
    </div>
    </div>
  );
};

export default TaskForm;

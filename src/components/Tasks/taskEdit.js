import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UpdateTaskForm = () => {
  const { id } = useParams(); // Get task id from URL params
 
  const [task, setTask] = useState({});
  const [status, setStatus] = useState('');

  useEffect(() => {
    // Fetch task details by id from backend on component mount
    const fetchTask = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/api/${id}`, {
          headers: { Authorization: `${token}` }
        });
        setTask(response.data.task);
        setStatus(response.data.task.status); // Initialize status with current task status
      } catch (err) {
        console.error(err);
        // Handle error appropriately
      }
    };

    fetchTask();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
     const response= await axios.put(`http://localhost:5000/api/${id}`, { ...task, status }, {
        headers: { Authorization: `${token}` }
      });
     if(response.status===200)
     {
        window.location.href='/list'
     }
    } catch (err) {
      console.error(err);
     
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  return (
    <div>
      <h1>Update Task</h1>
      <form onSubmit={handleUpdate}>
        <label>
          Title:
          <input type="text" name="title" value={task.title || ''} onChange={handleChange} disabled />
        </label>
        <label>
          Description:
          <input type="text" name="description" value={task.description || ''} onChange={handleChange} disabled />
        </label>
        <label>
          category:
          <input type="text" name="description" value={task.category || ''} onChange={handleChange} disabled />
        </label>
        
        <label>
          Status:
          <select name="status" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="in-progress">In Progress</option>
          </select>
        </label>
        <button type="submit">Update Status</button>
      </form>
    </div>
  );
};

export default UpdateTaskForm;

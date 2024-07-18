import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api', {
        headers: { Authorization: `${token}` }
      });
      if (Array.isArray(response.data.tasks)) {
        setTasks(response.data.tasks);
        setFilteredTasks(response.data.tasks); // Initialize filtered tasks with all tasks
      } else {
        setTasks([]);
        setFilteredTasks([]); 
      }
    } catch (err) {
      console.error(err);
      // Handle error appropriately
    }
  };

  const updateTask = async (id) => {
    navigate(`/update/${id}`);
  };

  const deleteTask = async (taskId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/${taskId}`, {
        headers: { Authorization: `${token}` }
      });
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const clickPost = () => {
    navigate('/tasks');
  };

  const handleSearch = () => {
    if (!searchTerm) {
      setFilteredTasks(tasks); // Reset filtered tasks to all tasks if search term is empty
    } else {
      const filtered = tasks.filter(task =>
        task.title.toLowerCase().match(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().match(searchTerm.toLowerCase()) ||
        task.status.toLowerCase().match(searchTerm.toLowerCase())
      );
      setFilteredTasks(filtered);
    }
  };

  return (
    <div>
      <div>
        <button onClick={clickPost}>Add Task</button>
      </div>
      <div>
        <input
          type="text"
          placeholder="Search by title, description, or status"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        <button onClick={() => setSearchTerm('')}>Clear</button>
      </div>
      <h1>Task List</h1>
      {filteredTasks.length === 0 ? (
        <p>No tasks available</p>
      ) : (
        <table className='list-container'>
          <thead className='list-header'>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Due Date</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className='list-item'>
            {filteredTasks.map(task => (
              <tr key={task.id}>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.status}</td>
                <td>{task.dueDate}</td>
                <td>{task.category}</td>
                <td>
                  <button onClick={() => updateTask(task.id)}>Update</button>
                  <button onClick={() => deleteTask(task.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TaskList;

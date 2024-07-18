import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Login from './components/Auth/login';
import Register from './components/Auth/register';
import Dashboard from './components/Tasks/taskForm';
import List from './components/Tasks/taskList';
import UpdateTask from './components/Tasks/taskEdit'

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/tasks" element={<Dashboard/>} />
      <Route path="/list" element={<List/>} />
      <Route path='/update/:id' element={<UpdateTask/>}/>
      </Routes>
    </Router>
  );
};

export default App;

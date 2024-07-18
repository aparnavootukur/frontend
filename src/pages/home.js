import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Task Management System</h1>
      <div> <Link to="/login">Login</Link></div>
     
      <div><Link to="/register">Register</Link></div>
    </div>
  );
};

export default Home;

import React, { useState } from 'react';
import axios from 'axios';
import '../../App.css'

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email,setEmail]=useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', { username,email, password });
      console.log(response)  
      if (response.status === 200) { 
        // Log the user in immediately 
        await axios.post('http://localhost:5000/api/auth/login', { email, password });
        window.location.href = '/login';
      }
    } catch (err) {
      console.error(err);
      alert('Registration failed. Please try again.');
    }
  };
  

  return (
    <div>
      <h1 className='heading'>Register page</h1>
      <div className='form-container'>
        <form onSubmit={handleSubmit} className='my-form'>
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
   
      <button type="submit">Register</button>

    </form>
    </div>
    </div>
  );
};

export default Register;

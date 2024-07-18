import React, { useState } from 'react';
import axios from 'axios';
import '../../App.css'
const Login = () => {
  
  const [password, setPassword] = useState('');
  const [email,setEmail]=useState("");
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      console.log(response,'res')
      localStorage.setItem('token', response.data.token);
      if (response.status === 200) { 
        // Log the user in immediately 
        const token = localStorage.getItem('token');
     
        const response = await axios.get('http://localhost:5000/api', {
          headers: { Authorization: `${token}` }
        });
        window.location.href = '/list';
        return response.data
      }
     
    } catch (err) {
      showAlert(err.response.data.msg)
    }
  };
  const showAlert = (message) => {
    alert(JSON.stringify(message)); 
  };
  

  return (
     <div>
      <h1 className='heading'>Login page</h1>
      <div className='form-container'>
        <form onSubmit={handleSubmit} className='my-form'>
          <div>
        <label>Email:</label>
        <input
          type="text"
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
      <button type="submit">Login</button>
    </form>
    </div>
    </div>

  );
};

export default Login;


import React, { useState } from 'react';
import background from "./Images/back1.png";
import { Link, useNavigate } from 'react-router-dom';
import Validation from './LoginValidation';
import axios from 'axios';
import './login.css'; 

function Login() {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });
  window.alert = function() {};

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [recordNotFound, setRecordNotFound] = useState(false); 

  const handleInput = (event) => {
    setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(Validation(values));
    setRecordNotFound(false); 

    if (errors.email === "" && errors.password === "") {
      axios.post('http://localhost:8081/login', values)
        .then(res => {
          if (res.data === "Success") {
            setLoggedIn(true); 
          } else {
            setRecordNotFound(true); 
          }
        })
        .catch(err => console.log(err));
    }
  };

  if (loggedIn) {
    navigate('/project/index1', { replace: true });
    return null;
  }

  return (
    <div
      className='login-box d-flex justify-content-center align-items-center vh-100'
      style={{ backgroundImage: `url(${background})` }}
    >
      <div
        className='login-container bg-light p-3 rounded w-25'
        style={{
          backgroundColor: 'white',
          border: '2px solid #48bb78',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h2
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '20px',
            fontSize: 'larger',
          }}
        >
          <strong>Sign-In</strong>
        </h2>
        <form action="" onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='email'>
              <strong>Email</strong>
            </label>
            <input
              type='email'
              placeholder='Enter Your Email'
              name='email'
              onChange={handleInput}
              className='form-control rounded-0 mt-2'
              style={{ width: '100%', padding: '10px', fontSize: '14px' }}
            />
            {errors.email && <span className='text-danger'>{errors.email}</span>}
          </div>
          <div className='mb-3'>
            <label htmlFor='password'>
              <strong>Password</strong>
            </label>
            <input
              type='password'
              placeholder='Enter Your Password'
              name='password'
              onChange={handleInput}
              className='form-control rounded-0 mt-2'
              style={{ width: '100%', padding: '10px', fontSize: '14px' }}
            />
            {errors.password && <span className='text-danger'>{errors.password}</span>}
          </div>
          {recordNotFound && <span className='text-danger'>No Record Existed</span>}
          <button
            type='submit'
            className='btn btn-success w-100 rounded-0'
            style={{ fontSize: '16px', padding: '10px' }}
          >
            <strong>Log in</strong>
          </button>
          <div className='Terms'>
            <p style={{ fontSize: '12px' }}>
              By Logging in you are agreeing to our Terms and Conditions
            </p>
          </div>
          <Link
            to='/signup'
            className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'
            style={{ fontSize: '14px', padding: '8px' }}
          >
            Create Account
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;

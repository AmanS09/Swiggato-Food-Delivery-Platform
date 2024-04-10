import React, { useState } from 'react';
import background from "./Images/back1.png";
import { Link, useNavigate } from 'react-router-dom';
import Validation from './SignupValidation';
import axios from 'axios';

function Signup() {
  const [values, setValues] = useState({
    name: '',
    number: '',
    email: '',
    password: ''
  });
  window.alert = function() {};
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    setValues(prev => ({ ...prev, [event.target.name]: [event.target.value] }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(Validation(values));

    if (errors.name === "" && errors.number === "" && errors.email === "" && errors.password === "") {
      axios.post('http://localhost:8081/signup', values)
        .then(res => {
          navigate('/');
        })
        .catch(err => console.log(err));
    }
  };

  const signupBoxStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundImage: `url(${background})`
  };

  const signupContainerStyles = {
    backgroundColor: 'white',
    border: '2px solid #48bb78',
    padding: '3rem',
    borderRadius: '0.25rem',
    width: '25%',
    fontSize: 'larger',
    boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)'
  };

  const formControlStyles = {
    width: '100%',
    borderRadius: '0',
    marginTop: '0.5rem',
    padding: '10px',
    fontSize: '14px'
  };

  const buttonStyles = {
    width: '100%',
    borderRadius: '0',
    backgroundColor: '#388e5d',
    fontSize: '16px',
    padding: '10px'
  };

  return (
    <div className='signup-box' style={signupBoxStyles}>
      <div className='signup-container' style={signupContainerStyles}>
        <h2 style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>Sign-Up</h2>
        <form action="" onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='name'><strong>Name</strong></label>
            <input type='text' placeholder='Enter Your Name' name='name'
              onChange={handleInput} className='form-control' style={formControlStyles} />
            {errors.name && <span className='text-danger'>{errors.name}</span>}
          </div>
          <div className='mb-3'>
            <label htmlFor='number'><strong>Phone Number</strong></label>
            <input type='number' placeholder='Enter Your Phone Number' name='number'
              onChange={handleInput} className='form-control' style={formControlStyles} />
            {errors.number && <span className='text-danger'>{errors.number}</span>}
          </div>
          <div className='mb-3'>
            <label htmlFor='email'><strong>Email</strong></label>
            <input type='email' placeholder='Enter Your Email' name='email'
              onChange={handleInput} className='form-control' style={formControlStyles} />
            {errors.email && <span className='text-danger'>{errors.email}</span>}
          </div>
          <div className='mb-3'>
            <label htmlFor='password'><strong>Password</strong></label>
            <input type='password' placeholder='Enter Your Password' name='password'
              onChange={handleInput} className='form-control' style={formControlStyles} />
            {errors.password && <span className='text-danger'>{errors.password}</span>}
          </div>
          <button className='btn btn-success' style={buttonStyles}><strong>Sign Up</strong></button>
          <p>By Signing Up you are agreeing to our Terms and Conditions</p>
          <Link to='/login' className='btn btn-default border bg-light text-decoration-none' style={buttonStyles}>Login</Link>
        </form>
      </div>
    </div>
  )
}

export default Signup;

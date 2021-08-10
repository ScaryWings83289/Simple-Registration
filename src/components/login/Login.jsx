import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import Background from './../../assets/background.jpg';
import './Login.css';

const Login = () => {
  const [user, setUser] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState({
    email: '',
    password: '',
  });
  const [state, setState] = useState({
    checked: false,
  });

  const handleCheckbox = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  }

  const validateForm = () => {
    let formIsValid = true;
    if (!user.email) {
      formIsValid = false;
      error.email = '*Please enter your email-ID.';
    }

    if (typeof user.email !== 'undefined') {
      //regular expression for email validation
      const pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      if (!pattern.test(user.email)) {
        formIsValid = false;
        error.email = '*Please enter valid email-ID.';
      }
    }

    if (!user.password) {
      formIsValid = false;
      error.password = '*Please enter your password.';
    }

    if (typeof user.password !== 'undefined') {
      if (!user.password.match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
        formIsValid = false;
        error.password = '*Please enter secure and strong password.';
      }
    }
    setError(error);
    return formIsValid;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()){
      alert('Login Successfully!')
    }
    setUser({
      email: '',
      password: ''
    }); 
  }

  return (
    <div className='login'>
      <img src={Background} className='image' alt='background' />
      <form className='form' onSubmit={handleSubmit}>
        <h2 className='heading'>Welcome back!</h2>
        <p className='sub-heading'>Please login to your account!</p>
        <TextField 
          className='text' 
          label='Email' 
          name='email'
          value={user.email}
          onChange={handleChange}
        />
        <div className='errorMsg'>{error.email}</div>
        <TextField 
          className='text' 
          label='Password' 
          name='password'
          value={user.password}
          onChange={handleChange}
        />
        <div className='errorMsg'>{error.password}</div>
        <p className='p'>
          <FormControlLabel
            control={
              <Checkbox
                checked={state.checked}
                onChange={handleCheckbox}
                name="checked"
                color="primary"
              />
            }
            label="Remember Me"
          />
          <span className='forgot'>Forgot Password</span>
        </p>
        <button className='button' type='submit'>Login</button>
        <p>Don't have an account? <Link to='/register' className='link'>SIGN UP</Link></p>
        <h6 className='footer'>Terms of use. Privacy Policy</h6>
      </form>
    </div>
  )
}

export default Login;
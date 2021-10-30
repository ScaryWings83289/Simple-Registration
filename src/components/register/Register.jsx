import React, { useState } from 'react';
//import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

import Background from './../../assets/background.jpg';
import './Register.css';

import Alert from './../alert/index';

const Register = () => {
  const [user, setUser] = useState({
    name: '',
    mobile: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState({
    name: '',
    mobile: '',
    email: '',
    password: '',
  });
  const [successDialog, setSuccessDialog] = useState(false);
  const [failureDialog, setFailureDialog] = useState(false);

  const closeSuccessDialog = () => {
    setSuccessDialog(false);
  };

  const closeFailureDialog = () => {
    setFailureDialog(false);
  };

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  }

  const validateForm = () => {
    let formIsValid = true;
    if (!user.name) {
      formIsValid = false;
      error.name = '*Please enter your name.';
    }
    if (typeof user.name !== 'undefined') {
      if (!user.name.match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        error.name = '*Please enter alphabet characters only.';
      }
    }
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

    if (!user.mobile) {
      formIsValid = false;
      error.mobile = '*Please enter your mobile no.';
    }

    if (typeof user.mobile !== 'undefined') {
      if (!user.mobile.match(/^[0-9]{10}$/)) {
        formIsValid = false;
        error.mobile = '*Please enter valid mobile no.';
      }
    }

    if (!user.password) {
      formIsValid = false;
      error.password = '*Please enter your password.';
    }

    if (typeof user.password !== 'undefined') {
      if (!user.password.match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[@#$%&]).*$/)) {
        formIsValid = false;
        error.password = '*Please enter secure and strong password.';
      }
    }
    setError(error);
    return formIsValid;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      localStorage.setItem(user.name, JSON.stringify(user));
      const data = {
        'username': user.name,
        'mobile': parseInt(user.mobile),
        'email': user.email,
        'password': user.password
      }
      axios({
        method: 'post',
        url: 'https://expressjwtauth.herokuapp.com/users/register',
        data: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'append,delete,entries,foreach,get,has,keys,set,values,Authorization',
        },
      }).then(response => {
        setSuccessDialog(true);
      }).catch(error => {
        setFailureDialog(true);
      })
    }
    setUser({
      name: '',
      mobile: '',
      email: '',
      password: ''
    });
  }

  const successHeader = 'Registration successful!';
  const successBody = 'User has been succesfully registered. Check your email for regular updates!';

  const failureHeader = 'Registration failed!';
  const failureBody = 'Try again. User with that mobile number & email address already Exists!';

  return (
    <div className='register'>
      <Alert open={successDialog} onClose={closeSuccessDialog} header={successHeader} body={successBody} />
      <Alert open={failureDialog} onClose={closeFailureDialog} header={failureHeader} body={failureBody} />
      <img src={Background} className='image' alt='background' />
      <form className='form' onSubmit={handleSubmit} noValidate>
        <h2 className='heading'>Sign Up!</h2>
        <p className='sub-heading'>Create a new account!</p>
        <TextField
          className='text'
          label='Name'
          name='name'
          value={user.name}
          onChange={handleChange}
        />
        <div className='errorMsg'>{error.name}</div>
        <TextField
          className='text'
          label='Mobile'
          name='mobile'
          value={user.mobile}
          onChange={handleChange}
        />
        <div className='errorMsg'>{error.mobile}</div>
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
          type='password'
          value={user.password}
          onChange={handleChange}
        />
        <div className='errorMsg'>{error.password}</div>
        <button className='button' type='submit'>Register</button>
        {/*<Link to='/users' className='footer'>See all Users</Link>*/}
        <h6 className='footers'>Terms of use. Privacy Policy</h6>
      </form>
    </div>
  )
}

export default Register;
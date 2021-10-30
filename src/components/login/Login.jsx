import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import axios from 'axios';

import Alert from './../alert/index';

import Background from './../../assets/background.jpg';
import Logo from './logo.png';
import './Login.css';

import {
  HeaderContainer,
  LogoContainer,
  OptionsContainer,
  OptionLink
} from './styles';

import CarouselContainer from './../carousel/Carousel';

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
  const [failureDialog, setFailureDialog] = useState(false);
  const [showHome, setShowHome] = useState(false);

  const closeFailureDialog = () => {
    setFailureDialog(false);
  };

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
      if (!user.password.match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[@#$%&]).*$/)) {
        formIsValid = false;
        error.password = '*Please enter secure and strong password.';
      }
    }
    setError(error);
    return formIsValid;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      //alert('Login Successfully!')
      const data = {
        'email': user.email,
        'password': user.password
      }
      axios({
        method: 'post',
        url: 'https://expressjwtauth.herokuapp.com/users/login',
        data: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'append,delete,entries,foreach,get,has,keys,set,values,Authorization',
        },
      }).then(response => {
        console.log(response.data);
        setShowHome(true);
      }).catch(error => {
        setFailureDialog(true);
        console.log('Failed');
      })
    }
    setUser({
      email: '',
      password: ''
    });
  }

  const hideHome = () => {
    setShowHome(false);
  }

  const failureHeader = 'Login failed!';
  const failureBody = 'Invalid email address or incorrect Password. Please enter valid credentials!';

  const loginPage = (
    <div className='login'>
      <Alert open={failureDialog} onClose={closeFailureDialog} header={failureHeader} body={failureBody} />
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
          type='password'
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
          {/*<span className='forgot'>Forgot Password</span>*/}
        </p>
        <button className='button' type='submit'>Login</button>
        <p>Don't have an account? <Link to='/register' className='link'>SIGN UP</Link></p>
        <h6 className='footer'>Terms of use. Privacy Policy</h6>
      </form>
    </div>
  )
  const homePage = (
    <>
      <HeaderContainer>
        <LogoContainer to='/'>
          <img src={Logo} alt="logo" />
        </LogoContainer>
        <OptionsContainer>
          <OptionLink to='/'>SHOP</OptionLink>
          <OptionLink to='/'>CONTACT</OptionLink>
          <OptionLink onClick={hideHome} to='/'>SIGN OUT</OptionLink>
        </OptionsContainer>
      </HeaderContainer>
      <CarouselContainer />
    </>
  );
  return showHome ? homePage : loginPage
}

export default Login;
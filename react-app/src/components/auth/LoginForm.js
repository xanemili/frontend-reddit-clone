import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { login } from "../../services/auth";
import {setUpUser} from '../redux/actions/users'
import {useDispatch} from 'react-redux'


const LoginForm = ({ authenticated, setAuthenticated }) => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch()

  const onLogin = async (e) => {
    e.preventDefault();
    const user = await login(email, password);
    if (!user.errors) {
      setAuthenticated(true);
      dispatch(setUpUser(user))
    } else {
      setErrors(user.errors);
    }
  };

  const demoLogin = async (e) => {
    e.preventDefault();
    const user = await login('demo@aa.io', 'password');
    if(!user.errors) {
      setAuthenticated(true);
      dispatch(setUpUser(user))
    } else {
      setErrors(user.errors);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="login-container">
      <div className="login-box" id="login">
      <div className="login-box_image_container">
        <div className="login-box_image_format">
          <img className="login-box_image" src={require('../../img/loginImage.jpg')} alt="login footer"/>
        </div>
      </div>
        <div className="login-box_form_container">
          <div className="login-form_header">
            <div className="login-form_title">
                Login
            </div>
            <div className="login-form_agreement">
              By continuing you agree to our {' '}
              <Link to="/policy/user-agreement">
                User Agreement {' '}
              </Link>
                and {' '}
              <Link to="/policy/privacy-policy">
                Privacy Policy.
              </Link>
            </div>
          </div>
          <form onSubmit={onLogin} className="login-form">
            <div className="login-form_errors">
              {errors.map((error) => (
                <div>{error}</div>
                ))}
            </div>
            <div className="login-form_email">
              <label className="login-form_label" htmlFor="email">Email</label>
              <input
                name="email"
                type="text"
                placeholder="Email"
                value={email}
                onChange={updateEmail}
                />
            </div>
            <div className="login-form_password">
              <label className="login-form_label" htmlFor="password">Password</label>
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={updatePassword}
                />
            </div>
            <div className="login-form_button_container">
              <div className="login-form_button">
                <button className='button-primary' type="submit">Login</button>
                <button className='button-primary demo-button' onClick={demoLogin}>Demo</button>

              </div>

            </div>
          </form>

        </div>

      </div>
    </div>
  );
};

export default LoginForm;

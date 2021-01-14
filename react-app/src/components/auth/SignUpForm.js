import React, { useState } from "react";
import { Redirect, Link } from 'react-router-dom';
import { signUp } from '../../services/auth';

const SignUpForm = ({authenticated, setAuthenticated}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [regErrorMsg, setErrorMsg] = useState('')

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const user = await signUp(username, email, password);
      if (!user.errors) {
        setAuthenticated(true);
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="login-container">
      <div className="signup-box" >
      <div className="login-box_image_container">
        <div className="login-box_image_format">
          <img className="login-box_image" src={require('../../img/loginImage.jpg')} alt="login footer"/>
        </div>
      </div>
        <div className="login-box_form_container">
          <div className="login-form_header">
            <div className="login-form_title">
              Create a new account!
            </div>
            <div className="login-form_agreement">
              By registering you agree to our {' '}
                <Link to="/policy/user-agreement">
                  User Agreement {' '}
                </Link>
                  and {' '}
                <Link to="/policy/privacy-policy">
                  Privacy Policy.
                </Link>
            </div>
          </div>
        <form onSubmit={onSignUp} className="login-form">
          {regErrorMsg ? (
            <div className="login-form_errors">
              {regErrorMsg}
              <div className="close-button"
                onClick={() => {
                  setErrorMsg('')
                }}>
              </div>
            </div>
          ) : ('') }
          <div className="login-form_email">
            <label className="login-form_label">User Name</label>
            <input
              type="text"
              name="username"
              placeholder="username"
              onChange={updateUsername}
              value={username}
              required
              ></input>
          </div>
          <div className="login-form_email">
            <label className="login-form_label">Email</label>
            <input
              type="text"
              name="email"
              placeholder="email"
              onChange={updateEmail}
              value={email}
              required
              ></input>
          </div>
          <div className="login-form_password">
            <label className="login-form_label">Password</label>
            <input
              type="password"
              placeholder="password"
              name="password"
              onChange={updatePassword}
              value={password}
              ></input>
          </div>
          <div className="login-form_password">
            <label className="login-form_label">Repeat Password</label>
            <input
              type="password"
              name="repeat_password"
              placeholder="repeat password"
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
              ></input>
          </div>
          <div className="login-form_button_container">
            <div className="register-button-box">
              <button  className="button-primary" type="submit">Sign Up</button>
            </div>
          </div>
        </form>
        </div>
      </div>

    </div>
  );
};

export default SignUpForm;

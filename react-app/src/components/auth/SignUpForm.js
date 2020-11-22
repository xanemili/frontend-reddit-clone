import React, { useState } from "react";
import { Redirect } from 'react-router-dom';
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
    <div className="reg-form">
      <h4 className="modal-title">Create a new account</h4>
      {regErrorMsg ? (
        <div>
          {regErrorMsg}
          <div className="close-button"
            onClick={() => {
              setErrorMsg = ''
            }}>
          </div>
        </div>
      ) : ('') }

    <form onSubmit={onSignUp}>
      <div>
        <label>User Name</label>
        <input
          type="text"
          name="username"
          placeholder="username"
          onChange={updateUsername}
          value={username}
          required
          ></input>
      </div>
      <div>
        <label>Email</label>
        <input
          type="text"
          name="email"
          placeholder="email"
          onChange={updateEmail}
          value={email}
          required
          ></input>
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          name="password"
          onChange={updatePassword}
          value={password}
          ></input>
      </div>
      <div>
        <label>Repeat Password</label>
        <input
          type="password"
          name="repeat_password"
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
          ></input>
      </div>
      <div className="register-button-box">
        <button  className="button-primary" type="submit">Sign Up</button>
      </div>
    </form>
    </div>
  );
};

export default SignUpForm;
import React from "react";
import {useDispatch} from 'react-redux'
import { logout } from "../../services/auth";
import {removeUser} from '../redux/actions/users'

const LogoutButton = ({setAuthenticated}) => {
  const dispatch = useDispatch()

  const onLogout = async (e) => {
    await logout();
    dispatch(removeUser())
    setAuthenticated(false);
  };

  return <button className="logout-btn" onClick={onLogout}>Logout</button>;
};

export default LogoutButton;

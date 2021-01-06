import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = props => {
  console.log(props)

  if (!props.authenticated) {
    return <Redirect to="/login"/>
  }

  console.log('whyroute')
  return (
    <Route {...props}/>
  );
};

export default ProtectedRoute;

import React, { useState, useEffect, useReducer } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import SubredditForm from './components/subreddit/SubredditForm'
import Subreddit from "./components/subreddit/Subreddit";
import PostForm from './components/post/PostForm'
import PostDisplay from "./components/post/PostDisplay"
import { authenticate } from "./services/auth";
import {subscriptionReducer} from './services/reducer'
import LandingPage from './components/LandingPage'

// function Layout(props) {
//   return <div id="layout">{props.children}</div>;
// }

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [subscriptions, setSubscriptions] = useReducer(subscriptionReducer, [])
  const [user, setUser] = useState({})

  useEffect(() => {
    (async() => {
      const user = await authenticate();
      setUser(user)
      if (!user.errors) {
        setAuthenticated(true);
        setSubscriptions({type: 'ADD', subscriptions: user.subscriptions})
      }
      setLoaded(true);
    })();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      {/* <Layout> */}
        <NavBar setAuthenticated={setAuthenticated} authenticated={authenticated} subscriptions={subscriptions} setSubscriptions={setSubscriptions} username={user.username} id={user.id}/>
        <Route path="/login" exact={true}>
          <LoginForm
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
          />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm authenticated={authenticated} setAuthenticated={setAuthenticated} />
        </Route>
        <Route path="/r/:subredditName/post/:postId">
          <PostDisplay authenticated={authenticated}/>
        </Route>
        <Route path="/r/:subredditName" exact>
          <Subreddit authenticated={authenticated} subscriptions={subscriptions} setSubscriptions={setSubscriptions}/>
        </Route>
        <ProtectedRoute path="/users" exact={true} authenticated={authenticated}>
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true} authenticated={authenticated}>
          <User {...user} />
        </ProtectedRoute>
        <ProtectedRoute path="/subreddits/create" exact={true} authenticated={authenticated}>
          <SubredditForm authenticated={authenticated}/>
        </ProtectedRoute>
        <ProtectedRoute path="/posts/create" exact={true} authenticated={authenticated}>
          <PostForm authenticated={authenticated}/>
        </ProtectedRoute>
        <Route path="/" exact={true} authenticated={authenticated}>
          <LandingPage user = {user} />
        </Route>
      {/* </Layout> */}
    </BrowserRouter>
  );
}

export default App;

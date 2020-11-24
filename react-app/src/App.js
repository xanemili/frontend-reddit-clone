import React, { useState, useEffect } from "react";
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
import Sidebar from './components/sidebar/Sidebar'
import { authenticate } from "./services/auth";

function Layout(props) {
  return <div id="layout">{props.children}</div>;
}

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async() => {
      const user = await authenticate();
      if (!user.errors) {
        setAuthenticated(true);
      }
      setLoaded(true);
    })();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar setAuthenticated={setAuthenticated} authenticated={authenticated} />
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
<<<<<<< HEAD
      <Route exact={true} path="/r/:subredditName">
=======
      <Route path="/r/:subredditName">
>>>>>>> f85915ea9937c279e7b4ae076ba473e82ca91e8b
        <Subreddit authenticated={authenticated}/>
      </Route>
      <ProtectedRoute path="/users" exact={true} authenticated={authenticated}>
        <UsersList/>
      </ProtectedRoute>
      <ProtectedRoute path="/users/:userId" exact={true} authenticated={authenticated}>
        <User />
      </ProtectedRoute>
      <ProtectedRoute path="/subreddits/create" exact={true} authenticated={authenticated}>
        <SubredditForm authenticated={authenticated}/>
      </ProtectedRoute>
      <ProtectedRoute path="/posts/create" exact={true} authenticated={authenticated}>
        <PostForm authenticated={authenticated}/>
      </ProtectedRoute>
      <ProtectedRoute path="/" exact={true} authenticated={authenticated}>
        <h1>My Home Page</h1>
        <Sidebar />
      </ProtectedRoute>
    </BrowserRouter>
  );
}

export default App;

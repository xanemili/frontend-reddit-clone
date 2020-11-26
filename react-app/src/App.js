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
  const [subscriptions, setSubscriptions] = useState([])
  const [user, setUser] = useState({})

  useEffect(() => {
    (async() => {
      const user = await authenticate();
      console.log("user",user);
      if (!user.errors) {
        setAuthenticated(true);
        setUser(user)
        setSubscriptions(user.subscriptions)
      }
      setLoaded(true);
    })();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
    
    <Layout>
        <NavBar {...user} setAuthenticated={setAuthenticated} authenticated={authenticated} subscriptions={subscriptions}/>
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
        <Route exact={true} path="/r/:subredditName">
          <Subreddit authenticated={authenticated} subscriptions={subscriptions}/>
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
        <Route path="/" exact={true} authenticated={authenticated}>
          <h1>My Home Page</h1>
          <Sidebar {...user} />
        </Route>
       </Layout>
    </BrowserRouter>
  );
}

export default App;

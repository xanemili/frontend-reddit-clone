import React, { Component } from 'react';
import Register from './Register';
import { BrowserRouter, Route, Link, Redirect } from 'react-router-dom';
import InnerHTML from 'react-dangerous-html';

function Layout(props) {
  return <div id="layout">{props.children}</div>;
}

export default class App extends Component {
  state = {
    loading: true,
    posts: [],
    user: {},
    token: '',
    loggedIn: false,    loginError: false,
    loginMsg: 'Something went wrong',
    currentPage: 1,
    loadMore: true,
    codes: null
  };

  register = (res) => {
    this.setState({
      loggedIn: true,
      user: res.user,
      token: res.token
    });
    let userInfo = {
      loggedIn: true,
      user: res.user,
      token: res.token
    };
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
  };

  tokenExpired = () => {
    this.logout();
  };

  login = (event) => {
    event.preventDefault();
    let user = {};
    user.username = event.target.username.value;
    user.password = event.target.password.value;
    if (user.username && user.password) {
      fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.success) {
            // login successfully
            this.setState({
              loggedIn: true,
              user: res.user,
              token: res.token
            });
            let userInfo = {
              loggedIn: true,
              user: res.user,
              token: res.token
            };
            localStorage.setItem('userInfo', JSON.stringify(userInfo));
          } else {
            this.setState({
              loginError: true,
              loginMsg: res.message
            });
          }
        })
        .catch((err) => {
          // Catch the error
          console.log(err);
          this.setState({
            loginError: true,
            loginMsg: err
          });
        });
    } else {
      this.setState({
        loginError: true,
        loginMsg: 'Missing credentials'
      });
    }
  };

  logout = () => {
    this.setState({
      loggedIn: false,
      token: undefined,
      user: {}
    });
    localStorage.removeItem('userInfo');
  };

  render() {
    return (
      <BrowserRouter>
        <Layout>
          <header id="header">
            <nav className="top-menu" />
            <div className="main-header">
              <Link to="/" id="header-img" className="default-header">
                reddit clone
              </Link>
              <div className="tab-menu" />

              <div className="user-header">
                {this.state.loggedIn ? (
                  <span>
                    Hello{' '}
                    <Link
                      className="fake-link"
                      to={`/user/${this.state.user.username}`}>
                      {this.state.user.username}
                    </Link>{' '}
                    |{' '}
                    <a className="fake-link" onClick={this.logout}>
                      logout
                    </a>{' '}
                  </span>
                ) : (
                  <span>
                    Want to join? <Link to="/register">sign up</Link> in
                    seconds.
                  </span>
                )}
              </div>
            </div>
          </header>
          <div id="container">
            <main id="body-submissions">
              {this.state.codes ? (
                <div className="banner top-banner padding">
                  <InnerHTML html={this.state.codes.topBanner} />
                </div>
              ) : (
                ''
              )}
             
              <Route
                path="/register"
                render={(props) =>
                  this.state.loggedIn ? (
                    <Redirect to="/" />
                  ) : (
                    <Register register={this.register} {...props} />
                  )
                }
              />
            </main>
            <aside id="sidebar">
              {/*
              <form action="">
                <input className="search" type="text" placeholder="Search" />
              </form>
              
              */}

              {this.state.loggedIn ? (
                ''
              ) : (
                <div className="login-box" id="login">
                  {this.state.loginError ? (
                    <div className="login-error">
                      {this.state.loginMsg}
                      <div
                        className="close-button"
                        onClick={() => {
                          this.setState({ loginError: false });
                        }}>
                        &times;
                      </div>
                    </div>
                  ) : (
                    ''
                  )}
                  <form onSubmit={this.login}>
                    <input
                      className="login-username"
                      type="text"
                      name="username"
                      placeholder="username"
                      required
                    />
                    <input
                      className="login-password"
                      type="password"
                      name="password"
                      placeholder="password"
                      required
                    />
                    <div className="login-button-area">
                      <a className="login-reset-link" href="/reset">
                        reset password
                      </a>
                      <button>login</button>
                    </div>
                  </form>
                </div>
              )}
              {this.state.loggedIn ? (
                <div className="submit-button">
                  <Link to="/submit">Submit</Link>
                </div>
              ) : (
                ''
              )}
            </aside>
          </div>
        </Layout>
      </BrowserRouter>
    );
  }
}

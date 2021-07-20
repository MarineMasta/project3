import { Redirect, Route } from "react-router-dom"

import "./App.css"
import Home from "./modules/pages/Home"
import Dashboard from "./modules/pages/Dashboard"
import { Component } from "react"
import Auth from "./Auth/Auth"
import Callback from "./Callback"
import Profile from "./modules/pages/Profile"
import Games from "./modules/pages/Games"
class App extends Component {
  constructor(props) {
    super(props)
    this.auth = new Auth(this.props.history)
  }

  render() {
    return (
      <>
        <Route
          path="/"
          exact
          render={(props) => <Home auth={this.auth} {...props} />}
        />
        <Route
          path="/callback"
          render={(props) => <Callback auth={this.auth} {...props} />}
        />
        <Route
          path="/profile"
          render={(props) => <Profile auth={this.auth} {...props} />}
        />

        <Route
          path="/games"
          render={(props) =>
            this.auth.isAuthenticated() ? (
              <Games auth={this.auth} {...props} />
            ) : (
              <Redirect to="/" />
            )
          }
        />

        <Route
          path="/dashboard"
          render={(props) =>
            this.auth.isAuthenticated() ? (
              <Dashboard auth={this.auth} {...props} />
            ) : (
              <Redirect to="/" />
            )
          }
        />
      </>
    )
  }
}

export default App

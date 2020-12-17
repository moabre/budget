import React, { Component } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './Components/Home'
import Login from './Components/Login'
import SignUp from './Components/SignUp'
import { AuthProvider } from './Auth'
import PrivateRoute from './Components/PrivateRoute'
import Dashboard from './Components/Dashboard'

class App extends Component {
  state = {
    url: null,
  }
  render() {
    return (
      <AuthProvider>
        <Router>
          <Switch>
            <PrivateRoute exact path='/home' component={Home} />
            <PrivateRoute exact path='/' component={Dashboard} />
            <Route exact path='/signup' component={SignUp} />
            <Route exact path='/login' component={Login} />
          </Switch>
        </Router>
      </AuthProvider>
    )
  }
}

export default App

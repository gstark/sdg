import React, { Component } from 'react'
import { Router, Route, Switch, Link } from 'react-router-dom'
import axios from 'axios'
import auth from './auth'
import history from './history'

import ListCohorts from './components/ListCohorts'
import CohortDetails from './components/CohortDetails'
import CreateCohort from './components/CreateCohort'
import EditCohort from './components/EditCohort'
import StudentDetails from './components/StudentDetails'

class App extends Component {
  componentWillMount() {
    if (auth.isAuthenticated()) {
      axios.defaults.headers.common = {
        Authorization: auth.authorizationHeader()
      }
    }
  }

  renderLoginOrLogout = () => {
    if (auth.isAuthenticated()) {
      return (
        <li className="nav-item">
          <Link to="/logout" className="nav-link">
            Logout
          </Link>
        </li>
      )
    } else {
      return (
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </li>
      )
    }
  }

  render() {
    return (
      <Router history={history}>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/" className="navbar-brand">
              SDG Cohorts
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item active">
                  <Link to="/" className="nav-link">
                    Home <span className="sr-only">(current)</span>
                  </Link>
                </li>
                {this.renderLoginOrLogout()}
              </ul>
            </div>
          </nav>

          <Switch>
            <Route exact path="/" component={ListCohorts} />

            <Route path="/login" render={() => auth.login()} />

            <Route
              path="/logout"
              render={() => {
                auth.logout()

                window.location = '/'

                return <></>
              }}
            />
            <Route
              path="/callback"
              render={() => {
                auth.handleAuthentication(() => {
                  // NOTE: Uncomment the following lines if you are using axios
                  //
                  // Set the axios authentication headers
                  axios.defaults.headers.common = {
                    Authorization: auth.authorizationHeader()
                  }

                  window.location = '/'
                })

                return <></>
              }}
            />

            <Route exact path="/cohorts/new" component={CreateCohort} />
            <Route exact path="/cohorts/:id" component={CohortDetails} />
            <Route exact path="/cohorts/edit/:id" component={EditCohort} />
            <Route
              exact
              path="/cohorts/:cohort_id/students/:student_id"
              component={StudentDetails}
            />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App

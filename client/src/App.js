import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'

import ListCohorts from './components/ListCohorts'
import CohortDetails from './components/CohortDetails'
import CreateCohort from './components/CreateCohort'
import EditCohort from './components/EditCohort'
import StudentDetails from './components/StudentDetails'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <div className="jumbotron">
            <h1 className="display-4">
              <Link to="/">Suncoast Developers Guild</Link>
            </h1>
          </div>
          <Switch>
            <Route exact path="/" component={ListCohorts} />
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

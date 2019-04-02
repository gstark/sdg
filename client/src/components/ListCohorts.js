import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import CohortListItem from './CohortListItem'
import auth from '../auth'

class ListCohorts extends Component {
  state = {
    cohorts: [],
    search: ''
  }

  componentDidMount() {
    axios.get('/api/cohorts').then(response => {
      this.setState({ cohorts: response.data })
    })
  }

  onSearchChange = event => {
    this.setState({ search: event.target.value }, () => {
      axios.get(`/api/cohorts?search=${this.state.search}`).then(response => {
        this.setState({ cohorts: response.data })
      })
    })
  }

  render() {
    if (!auth.isAuthenticated()) {
      return <></>
    }

    return (
      <>
        <input
          type="text"
          value={this.state.search}
          onChange={this.onSearchChange}
          placeholder="Search..."
        />
        <div className="list-group">
          {this.state.cohorts.map(cohort => (
            <CohortListItem key={cohort.id} cohort={cohort} />
          ))}
        </div>

        <Link className="btn btn-primary" to="/cohorts/new">
          Create
        </Link>
      </>
    )
  }
}

export default ListCohorts

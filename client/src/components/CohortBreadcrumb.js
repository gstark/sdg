import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class CohortBreadcrumb extends Component {
  render() {
    return (
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li class="breadcrumb-item">
            <Link to="/">Cohorts</Link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            <Link to={`/cohorts/${this.props.cohort.id}`}>
              {this.props.cohort.name}
            </Link>
          </li>
        </ol>
      </nav>
    )
  }
}

export default CohortBreadcrumb

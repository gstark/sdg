import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class CohortListItem extends Component {
  render() {
    return (
      <Link
        to={`/cohorts/${this.props.cohort.id}`}
        className="list-group-item list-group-item-action"
      >
        {this.props.cohort.name}
      </Link>
    )
  }
}

export default CohortListItem

import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import StudentMap from './StudentMap'
import CohortBreadcrumb from './CohortBreadcrumb'

const Student = props => {
  const deleteStudent = event => {
    axios
      .delete(`/api/cohorts/${props.cohort.id}/students/${props.student.id}`)
      .then(response => {
        // When the student is deleted call the loadCohort we were given
        props.loadCohort()
      })
  }

  return (
    <li key={props.student.id} className="list-group-item">
      <Link to={`/cohorts/${props.cohort.id}/students/${props.student.id}`}>
        {props.student.name}
      </Link>
      <button className="btn btn-danger float-right" onClick={deleteStudent}>
        x
      </button>
    </li>
  )
}

class CohortDetails extends Component {
  state = {
    cohort: {
      students: []
    }
  }

  loadCohort = () => {
    axios.get(`/api/cohorts/${this.props.match.params.id}`).then(response => {
      this.setState({ cohort: response.data })
    })
  }

  componentDidMount() {
    this.loadCohort()
  }

  deleteCohort = event => {
    console.log('Deleting cohort', this.state.cohort.id)
    axios.delete(`/api/cohorts/${this.state.cohort.id}`).then(response => {
      // Because we are a routed component
      // we have this.props.history
      //
      // And we can use that to redirect us home!
      this.props.history.push('/')
    })
  }

  renderStudents = () => {
    return (
      <>
        <div className="card">
          <h5 className="card-header">Students</h5>
          <div className="card-body">
            <div className="row">
              <div className="col-sm-6">
                <StudentMap students={this.state.cohort.students} />
              </div>
              <div className="col-sm-6">
                <ul className="list-group mb-3">
                  <li className="list-group-item list-group-item-info">
                    <span className="badge badge-warning badge-pill">
                      {this.state.cohort.student_count} Students
                    </span>
                  </li>
                  {this.state.cohort.students.map(student => (
                    <Student
                      key={student.id}
                      cohort={this.state.cohort}
                      student={student}
                      loadCohort={this.loadCohort}
                    />
                  ))}
                  <li className="list-group-item">
                    <Link
                      to={`/cohorts/${this.props.match.params.id}/students/new`}
                      className="btn btn-primary"
                    >
                      Add Student
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  render() {
    return (
      <>
        <CohortBreadcrumb cohort={this.state.cohort} />
        <ul className="list-group mb-3">
          <li className="list-group-item list-group-item-info">Details</li>
          <li className="list-group-item">
            Start: {this.state.cohort.start_date}
          </li>
          <li className="list-group-item">End: {this.state.cohort.end_date}</li>
        </ul>
        <div className="mb-3">
          <Link
            to={`/cohorts/edit/${this.state.cohort.id}`}
            className="btn btn-primary mr-2"
          >
            Edit
          </Link>
          <button className="btn btn-danger" onClick={this.deleteCohort}>
            Delete
          </button>
        </div>
        {this.renderStudents()}
      </>
    )
  }
}

export default CohortDetails

import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Form from 'react-jsonschema-form'
import StudentMap from './StudentMap'

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
    if (this.state.cohort.students.length === 0) {
      return <></>
    }

    return (
      <>
        <StudentMap students={this.state.cohort.students} />
        <ul className="list-group mb-3">
          <li className="list-group-item active d-flex justify-content-between align-items-center ">
            Students:
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
        </ul>
      </>
    )
  }

  addStudent = form => {
    axios
      .post(`/api/cohorts/${this.state.cohort.id}/students`, {
        student: form.formData
      })
      .then(response => {
        // Reload the cohort!
        this.loadCohort()
      })
  }

  addStudentForm = () => {
    const formSchema = {
      title: 'Add Student',
      type: 'object',
      required: ['name'],
      properties: {
        name: { type: 'string', title: 'Name', default: '' },
        address: { type: 'string', title: 'Address', default: '' },
        age: { type: 'integer', title: 'Age' },
        email: { type: 'string', title: 'E-mail' }
      }
    }

    return <Form schema={formSchema} onSubmit={this.addStudent} />
  }

  render() {
    return (
      <>
        <ul className="list-group mb-3">
          <li className="list-group-item active">{this.state.cohort.name}</li>
          <li className="list-group-item">
            Start: {this.state.cohort.start_date}
          </li>
          <li className="list-group-item">End: {this.state.cohort.end_date}</li>
        </ul>
        {this.renderStudents()}
        {this.addStudentForm()}
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
      </>
    )
  }
}

export default CohortDetails

import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Form from 'react-jsonschema-form-bs4'
import { DirectUploadProvider } from 'react-activestorage-provider'
import DefaultDirectUploadRender from './DefaultDirectUploadRender'

class StudentDetails extends Component {
  state = {
    student: {},
    editing: false
  }

  componentDidMount = () => {
    const cohort_id = this.props.match.params.cohort_id
    const student_id = this.props.match.params.student_id

    // This is the same as the two lines above const { cohort_id, student_id } = this.props.match.params

    axios
      .get(`/api/cohorts/${cohort_id}/students/${student_id}`)
      .then(response => {
        this.setState({ student: response.data })
      })
  }

  showDetails = () => {
    // Destructure the object `this.state.student` into individual variables
    const { name, address, email, age, photo_url } = this.state.student

    return (
      <ul className="list-group mb-3">
        <li className="list-group-item">{name}</li>
        <li className="list-group-item">{address}</li>
        <li className="list-group-item">{email}</li>
        <li className="list-group-item">{age}</li>
        <li className="list-group-item">
          <img src={photo_url} />
        </li>
      </ul>
    )
  }

  updateStudent = form => {
    const { cohort_id, student_id } = this.props.match.params

    axios
      .put(`/api/cohorts/${cohort_id}/students/${student_id}`, {
        student: Object.assign(form.formData, { photo: this.state.signedId })
      })
      .then(response => {
        this.props.history.push(`/cohorts/${cohort_id}`)
      })
  }

  showEditForm = () => {
    // Destructure the object `this.state.student` into individual variables
    const { name, address, email, age } = this.state.student

    const formSchema = {
      title: 'Student',
      type: 'object',
      required: ['name'],
      properties: {
        name: {
          type: 'string',
          title: 'Name',
          default: name
        },
        address: {
          type: 'string',
          title: 'Address',
          default: address
        },
        email: {
          type: 'string',
          title: 'email',
          default: email
        },
        age: {
          type: 'integer',
          title: 'age',
          default: age
        }
      }
    }

    return (
      <Form schema={formSchema} onSubmit={this.updateStudent}>
        <DirectUploadProvider
          onSuccess={signedIds => this.setState({ signedId: signedIds[0] })}
          render={DefaultDirectUploadRender}
        />
        <button className="btn btn-info" type="submit">
          Submit
        </button>
      </Form>
    )
  }

  toggleEditing = event => {
    this.setState({ editing: !this.state.editing })
  }

  render() {
    return (
      <>
        <h1>Student</h1>
        {this.state.editing ? this.showEditForm() : this.showDetails()}
        <button className="btn btn-primary mr-3" onClick={this.toggleEditing}>
          Edit
        </button>
        <Link
          to={`/cohorts/${this.props.match.params.cohort_id}`}
          className="btn btn-primary"
        >
          Back
        </Link>
      </>
    )
  }
}

export default StudentDetails

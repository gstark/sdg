import React, { Component } from 'react'
import Form from 'react-jsonschema-form-bs4'
import axios from 'axios'

class CreateStudent extends Component {
  addStudent = form => {
    axios
      .post(`/api/cohorts/${this.props.match.params.cohort_id}/students`, {
        student: form.formData
      })
      .then(response => {
        this.props.history.push(`/cohorts/${this.props.match.params.cohort_id}`)
      })
  }

  render() {
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
}

export default CreateStudent

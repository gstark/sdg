import React, { Component } from 'react'
import Form from 'react-jsonschema-form'
import axios from 'axios'

class CreateCohort extends Component {
  onSubmit = form => {
    // See if we have the data we need for creating a cohort
    console.log(form)

    // Use axios to *CREATE* a cohort

    axios
      .post('/api/cohorts', {
        cohort: form.formData
      })
      .then(response => {
        // Because we are a routed component
        // we have this.props.history
        //
        // And we can use that to redirect us home!
        this.props.history.push('/')
      })
  }

  render() {
    const formSchema = {
      title: 'Cohort',
      type: 'object',
      required: ['name'],
      properties: {
        name: { type: 'string', title: 'Name', default: '' },
        start_date: { type: 'string', format: 'date', title: 'Start Date' },
        end_date: { type: 'string', format: 'date', title: 'End Date' },
        paid: { type: 'boolean', title: 'Paid?', default: true }
      }
    }

    return (
      <div>
        <Form schema={formSchema} onSubmit={this.onSubmit} />
      </div>
    )
  }
}

export default CreateCohort

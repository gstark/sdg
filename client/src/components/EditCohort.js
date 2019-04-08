import React, { Component } from 'react'
import Form from 'react-jsonschema-form-bs4'
import axios from 'axios'
import CohortBreadcrumb from './CohortBreadcrumb'

class EditCohort extends Component {
  state = {
    cohort: {}
  }

  componentDidMount = () => {
    // Call the backend route (endpoint) for getting a single cohort
    // and we tell it which cohort based on the id we get from react router
    //
    // Front end URL /cohorts/edit/1 will edit cohort 1
    // Front end URL /cohorts/edit/2 will edit cohort 2
    //
    axios.get(`/api/cohorts/${this.props.match.params.id}`).then(response => {
      this.setState({ cohort: response.data })
    })
  }

  onSubmit = form => {
    // See if we have the data we need for creating a cohort
    console.log(form)

    // Use axios to *CREATE* a cohort

    axios
      .put(`/api/cohorts/${this.props.match.params.id}`, {
        cohort: form.formData
      })
      .then(response => {
        // Because we are a routed component
        // we have this.props.history
        //
        // And we can use that to redirect us to the cohort's detail page
        this.props.history.push(`/cohorts/${this.props.match.params.id}`)
      })
  }

  render() {
    const formSchema = {
      title: 'Cohort',
      type: 'object',
      required: ['name'],
      properties: {
        name: {
          type: 'string',
          title: 'Name',
          default: this.state.cohort.name
        },
        start_date: {
          type: 'string',
          format: 'date',
          title: 'Start Date',
          default: this.state.cohort.start_date
        },
        end_date: {
          type: 'string',
          format: 'date',
          title: 'End Date',
          default: this.state.cohort.end_date
        },
        paid: {
          type: 'boolean',
          title: 'Paid?',
          default: this.state.cohort.paid
        }
      }
    }

    return (
      <div>
        <CohortBreadcrumb cohort={this.state.cohort} />
        <Form schema={formSchema} onSubmit={this.onSubmit} />
      </div>
    )
  }
}

export default EditCohort

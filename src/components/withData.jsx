import React, { Component } from 'react'

/**
 * Creates a higher-order component for managing the state and data loading
 * needs. Works with any Promise-returning data loading function
 */
export default function withData(fetchFn) {

  return ComposedComponent => class WithData extends Component {
      constructor() {
        super()
        this.state = {
          loading: false,
          data: [],
          error: '',
        }
        this.fetchData = this.fetchData.bind(this)
      }

      componentWillMount() {
        this.fetchData()
      }

      fetchData() {
        this.setState({ loading: true, error: '' })
        fetchFn()
          .then(data => {
            this.setState({ loading: false, data })
          }, err => {
            this.setState({ error: err.toString(), loading: false })
          })
      }

      render() {
        return (
          <ComposedComponent
            {...this.props}
            loading={this.state.loading}
            data={this.state.data}
            error={this.state.error}
            refresh={this.fetchData}
          />
        )
      }
  }
}

import React, { Component } from 'react'

/**
 * Creates a higher-order component for injecting the current Date as
 * props into a component, updated on a given interval
 */
export default function withTime({updateFreq = 1000, prop = 'time'} = {}) {

  return ComposedComponent => class WithTime extends Component {
      constructor() {
        super()
        this.state = {
          time: new Date()
        }
      }

      componentWillMount() {
        this.interval = setInterval(() => {
          this.setState({ time: new Date() })
        }, updateFreq)
      }

      componentWillUnmount() {
        clearInterval(this.interval)
      }

      render() {
        const props = { ...this.props, [prop]: this.state.time }
        return React.createElement(ComposedComponent, props)
      }
  }
}

import React, { Component } from 'react'

import TrainStatusBoard from './components/TrainStatusBoard'

const styles = {
  container: {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#eee',
    minWidth: 800,
  },
}

export default class App extends Component {
  render() {
    return (
      <div style={styles.container}>
        <TrainStatusBoard />
      </div>
    )
  }
}

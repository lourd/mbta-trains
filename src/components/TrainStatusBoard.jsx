import React, { Component, PropTypes } from 'react'
import moment from 'moment'

import fetchTrainData from '../lib/fetchTrainData'
import withData from './withData'
import withTime from './withTime'
import TrainStatus from './TrainStatus'

const styles = {
  container: {
    backgroundColor: '#222',
    borderRadius: 4,
    color: '#fff',
    padding: '25px 15px 0px',
    margin: 30,
    boxShadow: '0px 0px 10px rgba(0,0,0,0.5)',
  },
  title: {
    margin: 0,
    textAlign: 'center',
    fontSize: 36,
  },
  time: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 10,
  },
  trainEntry: {
    width: '100%',
    backgroundColor: '#1d1d1d',
    padding: '10px 5px',
    display: 'flex',
    justifyContent: 'space-between',
    borderRadius: 2,
    margin: '4px 0px',
  },
}

@withTime()
@withData(fetchTrainData)
export default class TrainStatusBoard extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    data: PropTypes.arrayOf(PropTypes.object),
    refresh: PropTypes.func.isRequired,
    time: PropTypes.instanceOf(Date).isRequired,
    error: PropTypes.string,
  }

  render() {
    const { data, time } = this.props
    const timeString = moment(time).format('dddd, MMMM Do, YYYY h:mm:ss A')
    return (
      <div style={styles.container}>
        <div style={styles.title}>Train Information</div>
        <div style={styles.time}>{timeString}</div>
        <div style={styles.trainEntry}>
          <div>Origin</div>
          <div>Trip #</div>
          <div>Departure</div>
          <div>Destination</div>
          <div>Track</div>
          <div>Status</div>
        </div>
        {data.map(train => (
          <TrainStatus
            train={train}
            key={train.Trip}
            time={time}
            style={styles.trainEntry}
          />
        ))}
      </div>
    )
  }
}

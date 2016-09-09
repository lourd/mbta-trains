import React, { Component, PropTypes } from 'react'
import moment from 'moment'

const styles = {
  container: {

  },
  cell: {
    padding: '0px 10px',
    // maxWidth: '20%',
  },
}

const Cell = ({ children }) => (
  <div style={styles.cell}>
    {children}
  </div>
)

export default class TrainStatus extends Component {
  static propTypes = {
    train: PropTypes.shape({
      TimeStamp: PropTypes.instanceOf(Date).isRequired,
      Origin: PropTypes.string.isRequired,
      Trip: PropTypes.string.isRequired,
      Destination: PropTypes.string.isRequired,
      ScheduledTime: PropTypes.instanceOf(Date).isRequired,
      Lateness: PropTypes.number.isRequired,
      Track: PropTypes.string,
      Status: PropTypes.string.isRequired,
    }),
    time: PropTypes.instanceOf(Date).isRequired,
    style: PropTypes.object,
  }

  render() {
    const {
      train: {
        Origin,
        Destination,
        ScheduledTime,
        Trip,
        Track,
        Status,
      },
      style,
    } = this.props
    const departString = moment(ScheduledTime).format('hh:mm A')
    return (
      <div style={{ ...styles.container, ...style }}>
        <Cell>{Origin}</Cell>
        <Cell>{Trip}</Cell>
        <Cell>{departString}</Cell>
        <Cell>{Destination}</Cell>
        <Cell>{Track || 'n/a'}</Cell>
        <Cell>{Status}</Cell>
      </div>
    )
  }
}

import csvString from './departures.csv'
import parseCSV from './parseCSV'

/**
 * Fetches the train data from MBTA server
 */
// eslint-disable-next-line
async function fetchData() {
  const url = 'http://developer.mbta.com/lib/gtrtfs/Departures.csv'
  const options = {
    headers: new window.Headers({
      // Lying about origin doesn't actually make a difference
      'Origin': 'http://www.mbta.com',
    })
  }
  const response = await window.fetch(url, options)
  const text = await response.text()
  return text

  // Also didn't work
  // const req = new XMLHttpRequest()
  // return new Promise((resolve, reject) => {
  //   req.addEventListener('load', function() {
  //     resolve(this.responseText)
  //   })
  //   req.open('GET', url)
  //   req.send()
  // })
}

/**
 * Encodes the received data into desired data types
 */
function transform(obj) {
  return {
    ...obj,
    TimeStamp: new Date(obj.TimeStamp * 1000), // in seconds, Date expects ms
    ScheduledTime: new Date(obj.ScheduledTime * 1000),
  }
}

/**
 * Handles fetching and parsing the CSV data. It's async just in case we need
 * to do something asynchronous, like actually fetch it from the server
 */
// eslint-disable-next-line
export default async function fetchTrainData() {
  // const csvString = await fetchData()
  const records = parseCSV(csvString, { transform })
  return records
}


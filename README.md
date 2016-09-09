# MBTA Sample Assignment
This is a small web app that was created as part of applying to the [MBTA](mbta.com) software team. You can view it live at https://lourd.github.io/mbta-trains.

The requirements were minimal:

1. Using the data at http://developer.mbta.com/lib/gtrtfs/Departures.csv
2. Display it on a webpage, ideally using React

### Running it locally
Pre-requisites: Git, Node.js, and npm installed on your machine.

```sh
git clone https://github.com/lourd/mbta-trains
cd mbta-trains
npm install
npm start
```

### Setup
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). This initialized the `config/` and `scripts/` directories, setting up the scaffolding and solid defaults for Babel, Webpack, linting with ESLint, and testing with Jest. I [ejected] from the core `create-react-app` CLI so that I could bundle the CSV data file (see more below), as well add support for decorators and hot module reloading.

### Notes

#### Getting the data
I initially tried to do requirement 1 dynamically, fetching the data when the page loaded. Unfortunately this wasn't possible because the origin server isn't configured to serve resources across origins. The 'Access-Control-Allow-Origin' of the server is set to 'mbta.com', so any sites not hosted from there aren't able to fetch the resources. I did leave the implementation of this work in place though in [`fetchTrainData.js`](src/lib/fetchTrainData.js)

My second attempt with the data was keeping it in a local file and importing it as a simple string. To do so I had to add to the webpack configuration, seen [here](config/webpack.config.dev.js#L156-#L159).

#### Parsing the CSV
I decided to write a simple CSV parser instead of using an open source library. Normally I wouldn't do that, but I decided that the context warranted doing so. I wrote a couple [tests](src/lib/parseCSV.test.js) to verify its correctness, which you can run with `npm test` after installing this program.

#### Displaying the data
The app consists of 2 main components, [`TrainStatusBoard`](src/components/TrainStatusBoard.jsx) and [`TrainStatus`](src/components/TrainStatus.jsx). `TrainStatusBoard` is decorated with 2 Higher-order components, [`withData`](src/components/withData.jsx) and [`withTime`](src/components/withTime.js). These provide encapsulation for fetching and managing state over time.

The layout of the board uses plain divs and flexbox positioning. An alternative would have been to use a table.

You may also notice that much of the styling is done in Javascript, applying object literals directly to the `style` property of HTML elements. There's been a lively debate going on within the React community for some time about the tradeoffs of doing this. If I were to use CSS, or another pre-processor, I would apply a `className` property to the HTML components and write the styling in an external stylesheet that I could `import` in the Javascript module.

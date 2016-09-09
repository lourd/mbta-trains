import React from 'react'
import { render } from 'react-dom'
import { AppContainer as HotContainer } from 'react-hot-loader'

import App from './App'
import './index.css'

render(
  <HotContainer>
    <App/>
  </HotContainer>,
  document.getElementById('root')
)

// Enable hot swapping dev environment. No-op in production, no impact
if (module.hot) {
  module.hot.accept('./App', () => {
    const UpdatedApp = require('./App').default
    render(
      <HotContainer>
        <UpdatedApp/>
      </HotContainer>,
      document.getElementById('root')
    )
  })
}

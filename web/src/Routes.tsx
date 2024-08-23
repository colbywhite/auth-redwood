import { Router, Route, Set } from '@redwoodjs/router'

import RootLayout from 'src/layouts/RootLayout/RootLayout'

import { useAuth } from './auth'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      <Set wrap={RootLayout}>
        <Route path="/" page={IndexPage} name="index" />
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes

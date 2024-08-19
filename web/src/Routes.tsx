import {Router, Route, Set} from '@redwoodjs/router'
import RootLayout from "src/layouts/RootLayout/RootLayout";

const Routes = () => {
  return (
    <Router>
      <Set wrap={RootLayout}>
        <Route path="/" page={IndexPage} name="index"/>
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes

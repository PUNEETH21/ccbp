// FIX1: In order to use Switch component it should be imported
import {Route, Switch} from 'react-router-dom'

import Home from './components/Home'
import NotFound from './components/NotFound'
import TeamMatches from './components/TeamMatches'

import './App.css'

const App = () => (
  // FIX2: Routes should be wrapped with Switch component from react-router-dom
  <Switch>
    {/* FIX3: exact keyword should be added */}
    <Route exact path="/" component={Home} />
    {/* FIX4: The route component should be given to the prop "component" of Route */}
    {/* FIX5: The value of path prop should be as below as the URL contains URL parameters */}
    <Route exact path="/team-matches/:id" component={TeamMatches} />
    <Route component={NotFound} />
  </Switch>
)

export default App

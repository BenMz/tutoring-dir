import React, {Fragment} from 'react';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';


const App = () => 
<Router>
    <Fragment>
      <Route exact path="/" component={Landing} />
  <section>
    <div className="container">
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </div>
  </section>

    </Fragment>
    </Router>

export default App;

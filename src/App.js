import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Dashboard from './components/dashboard/Dashboard'
import ProjectDetails from './components/projects/ProjectDetails'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import RecordDetails from './components/records/RecordDetails'
import CreateProject from './components/projects/CreateProject'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <Switch>
            <Route exact path='/'component={Dashboard} />
            <Route exact path='/projects/:projectId' component={ProjectDetails} />
            <Route path='/signin' component={SignIn} />
            <Route path='/signup' component={SignUp} />
            <Route path='/projects/:projectId/records/:recordId' component={RecordDetails} />
            <Route path='/create' component={CreateProject} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;

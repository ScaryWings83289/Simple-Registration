import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './components/login/Login';
import Register from './components/register/Register';
//import Users from './components/users/Users';

const App = () => {
  return (
    <Switch>
      <Route exact path='/' component={Login} />
      <Route path='/register' component={Register} />
      {/*<Route exact path='/users' component={Users} />*/}
    </Switch>
  );
}

export default App;

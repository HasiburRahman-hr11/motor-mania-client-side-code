import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Dashboard from './Admin/Pages/Dashboard/Dashboard';

import Home from './Pages/Home/Home';
import Shop from './Pages/Shop/Shop';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/shop">
          <Shop />
        </Route>


        <Route exact path="/admin/dashboard">
          <Dashboard />
        </Route>


      </Switch>
    </BrowserRouter>
  );
};

export default App;
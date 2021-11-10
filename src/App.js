import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Dashboard from './Admin/Pages/Dashboard/Dashboard';

import Home from './Pages/Home/Home';
import SingleProduct from './Pages/SingleProduct/SingleProduct';
import Inventory from './Pages/Inventory/Inventory';
import Signin from './Pages/Signin/Signin';
import Signup from './Pages/Signup/Signup';
import PrivateRoute from './utils/privateRoute';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/inventory">
          <Inventory />
        </Route>
        <PrivateRoute path="/bikes/:id">
          <SingleProduct />
        </PrivateRoute>
        <Route exact path="/signin">
          <Signin />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>


        <Route exact path="/admin/dashboard">
          <Dashboard />
        </Route>


      </Switch>
    </BrowserRouter>
  );
};

export default App;
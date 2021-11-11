import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Dashboard from './Admin/Pages/Dashboard/Dashboard';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

import Home from './Pages/Home/Home';
import SingleProduct from './Pages/SingleProduct/SingleProduct';
import Inventory from './Pages/Inventory/Inventory';
import Signin from './Pages/Signin/Signin';
import Signup from './Pages/Signup/Signup';
import PageScroll from './Components/PageScroll/PageScroll';

import useAuth from './hooks/useAuth';

import PrivateRoute from './utils/privateRoute';
import AdminRoute from './utils/AdminRoute';
import AddBike from './Admin/Pages/AddBike/AddBike';
import AllBikes from './Admin/Pages/AllBikes/AllBikes';

const App = () => {

  const { user } = useAuth();

  return (
    <BrowserRouter>
      <ToastContainer />
      <PageScroll />
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


        <AdminRoute exact path="/admin/dashboard">
          <Dashboard />
        </AdminRoute>
        <AdminRoute exact path="/admin/bikes">
          <AllBikes />
        </AdminRoute>
        <AdminRoute exact path="/admin/bikes/add">
          <AddBike />
        </AdminRoute>

        <Route exact path="/signin">
          {!user.email || !user.displayName ? (
            <Signin />
          ) : (
            <Redirect to="/" />
          )}
        </Route>
        <Route exact path="/signup">
          {!user.email || !user.displayName ? (
            <Signup />
          ) : (
            <Redirect to="/" />
          )}
        </Route>


      </Switch>
    </BrowserRouter>
  );
};

export default App;
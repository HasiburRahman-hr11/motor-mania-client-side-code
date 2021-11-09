import React from 'react';
import {BrowserRouter , Switch , Route} from 'react-router-dom';

import Home from './Pages/Home/Home';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Home/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
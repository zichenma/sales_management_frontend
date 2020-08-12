import React from 'react';
import store from './store';
import { Provider } from 'react-redux';
import {HashRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/home';
import Detail from './pages/detail';


function App() {
  return (
    <Provider store={store}>
       <div>
        <HashRouter>
          <Switch>
            <Route path='/' exact component={Home}></Route>
            <Route path='/orderId/:order_id'  component={Detail}></Route>
          </Switch>
        </HashRouter>
       </div>
    </Provider>
  );
}

export default App;

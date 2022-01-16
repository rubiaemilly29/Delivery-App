import React from 'react';
import './App.css';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Product from './pages/Product';
import Checkout from './pages/Checkout';
import OrderDetails from './pages/OrderDetails';
import OrderDetailsSeller from './pages/OrderDetailsSeller';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/customer/checkout" component={ Checkout } />
        <Route exact path="/customer/products" component={ Product } />
        <Route exact path="/register" component={ Register } />
        <Route exact path="/login" component={ Login } />
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route
          exact
          path="/customer/orders/:id"
          render={ (props) => <OrderDetails { ...props } /> }
        />
        <Route
          exact
          path="/seller/orders/:id"
          render={ (props) => <OrderDetailsSeller { ...props } /> }
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;

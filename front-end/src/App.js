import React from 'react';
import './App.css';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Product from './pages/Product';
import Orders from './pages/Orders';
import OrdersDetails from './pages/OrderDetails';
import Checkout from './pages/Checkout';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/customer/orders" component={ Orders } />
        <Route exact path="/seller/orders" component={ Orders } />
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
          render={ (props) => <OrdersDetails { ...props } /> }
        />
        <Route
          exact
          path="/seller/orders/:id"
          render={ (props) => <OrdersDetails { ...props } /> }
        />
        {/* <Route exact path="/customer/orders/:id" component={ OrdersDetails } />
        <Route exact path="/seller/orders/:id" component={ OrdersDetails } /> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;

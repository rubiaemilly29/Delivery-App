import React from 'react';
import './App.css';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Product from './pages/Product';
import SellerOrders from './pages/Orders';
import OrdersDetails from './pages/OrderDetails';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/customer/orders/:id" component={ OrdersDetails } />
        <Route exact path="/seller/orders/:id" component={ OrdersDetails } />
        <Route path="/customer/orders" component={ SellerOrders } />
        <Route path="/seller/orders" component={ SellerOrders } />
        <Route exact path="/customer/products" component={ Product } />
        <Route exact path="/register" component={ Register } />
        <Route exact path="/login" component={ Login } />
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

import React from 'react';
import './App.css';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Product from './pages/Product';
import OrdersCustomer from './pages/OrdersCustomer';
import SellerOrders from './pages/SellerOrders';
import OrdersDetails from './pages/OrderDetails';
import Checkout from './pages/Checkout';
import OrdersDetailsSeller from './pages/OrderDetailsSeller';
import AdmManager from './pages/AdmManager';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/admin/manage" component={ AdmManager } />
        <Route exact path="/customer/orders" component={ OrdersCustomer } />
        <Route exact path="/seller/orders" component={ SellerOrders } />
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
          render={ (props) => <OrdersDetailsSeller { ...props } /> }
        />
        {/* <Route exact path="/customer/orders/:id" component={ OrdersDetails } />
        <Route exact path="/seller/orders/:id" component={ OrdersDetails } /> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;

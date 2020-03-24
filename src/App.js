import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import MainLayout from 'layouts/MainLayout';
import Products from 'pages/Products';
import ProductDetails from 'pages/ProductDetails';
import Cart from 'pages/Cart';
import PageNoExist from 'pages/PageNoExist';

function App() {
  return (
    <div className="App">
      <MainLayout>
        <Router>
          <Switch>
            <Route exact path="/">
              <Products />
            </Route>
            <Route path="/cart">
              <Cart />
            </Route>
            <Route path="/product/:id/details">
              <ProductDetails />
            </Route>
            <Route path="*">
              <PageNoExist />
            </Route>
          </Switch>
        </Router>


      </MainLayout>

    </div>
  );
}

export default App;

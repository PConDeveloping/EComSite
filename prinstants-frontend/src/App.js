import React from 'react';
// import data from './data';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import AddProductsScreen from './screens/AddProductsScreen';
import CartScreen from './screens/CartScreen';
import SignInScreen from './screens/SignInScreen';
import RegisterScreen from './screens/RegisterScreen';
import { useSelector } from 'react-redux';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';


function App() {

    const userSignin = useSelector(state=>state.userSignin);
    const {userInfo} = userSignin;


  const openMenu = () => {
          document.querySelector(".sidebar").classList.add('open')
        }
  const closeMenu = () => {
            document.querySelector(".sidebar").classList.remove('open')
        }
  
  
  return (
  <BrowserRouter>
      <div className="grid-container">
          
            <header className="header">
                    <div className="brand">

                        <button onClick={openMenu}>
                            &#9776;
                        </button>
                        <Link to="/">Prinstants</Link>
                        {/* <a href="index.html">Prinstants</a> */}
                    </div>
                    <div className="header-links">
                        <a className="header-btn-right" href="/cart">Cart</a>
                        {
                            userInfo ? <Link className="header-btn-right header-cart" to="/profile">{userInfo.name}</Link>
                            :<Link className="header-btn-right header-signin" to="/signin">Sign-In</Link>
                        }
                        
                    </div>
            </header>

            <aside className="sidebar">
                <h3 className="sidebar-title"> Shoping Categories</h3>
                <button className="sidebar-close-button" onClick={closeMenu}>x</button>

                <ul>
                    <li>
                        <a href="index.html">Pants</a>
                    </li>
                    <li>
                        <a href="index.html">Shirts</a>
                    </li>
                    <li>
                        <a href="index.html">Shoes</a>
                    </li>

                </ul>
            </aside>
          
      <main className="main">
          
          <div className="content">
          <Route path="/products" component={AddProductsScreen} />
            <Route path="/shipping" component={ShippingScreen} />
            <Route path="/payment" component={PaymentScreen} />
            <Route path="/placeorder" component={PlaceOrderScreen} />
            <Route path="/signin" component={SignInScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/product/:id" component={ProductScreen} />
            <Route path="/cart/:id?" component={CartScreen} />
            <Route path="/" exact={true} component={HomeScreen} />
          </div>

      </main>

      <footer className="footer">All rights reserved</footer>

  </div>
</BrowserRouter>

);
  }

export default App;

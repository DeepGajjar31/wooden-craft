// Routers.js

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Home from '../pages/Home';
import Products from '../pages/Products';
import Cart from '../pages/Cart';
import ProductDetails from '../pages/ProductDetails'; // Import ProductDetails
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Checkout from '../pages/Checkout';
import ProtectedRoute from './ProtectedRoute';

import AddProducts from '../Admin/AddProducts';
import AllProducts from '../Admin/AllProducts';
import Dashboard from '../Admin/Dashboard';
import Users from '../Admin/Users';
import MyProfile from '../pages/MyProfile';
import Payment from '../pages/Payment';
import OrderSuccessful from '../pages/OrderSuccessful';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import useAuth from '../custom-hooks/useAuth.js'; // Import the useAuth hook
import Orders from '../Admin/Orders.jsx';

const stripePromise = loadStripe('your_stripe_publishable_key'); // Replace with your actual key

const Routers = () => {
  // Use the useAuth hook to get the current user
  const { currentUser } = useAuth();

  // Define state to manage cart items
  const [cartItems, setCartItems] = React.useState([]);

  // Function to add items to the cart
  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  return (
    <Routes>
      <Route path="/" element={<Navigate to="home" />} />
      <Route path="home" element={<Home />} />
      <Route path="about" element={<About />} />

      {currentUser && currentUser.email === 'admin@gmail.com' && (
        <Route path="/*" element={<ProtectedRoute />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="dashboard/all-products" element={<AllProducts />} />
          <Route path="dashboard/add-products" element={<AddProducts />} />
          <Route path="dashboard/users" element={<Users />} />
          <Route path="dashboard/orders" element={<Orders />} />
        </Route>
      )}

      <Route path='/*' element={<ProtectedRoute />}>
        <Route path="checkout" element={<Checkout />} />
        <Route path="contact" element={<Contact />} />
        <Route path='myprofile/*' element={<MyProfile />} />
      </Route>
      <Route path="products" element={<Products />} />
      <Route path="products/:productId" element={<ProductDetails addToCart={addToCart} />} />
      <Route path="cart" element={<Cart cartItems={cartItems} />} />
      {/* <Route path="checkout" element={<ProtectedRoute>
        <Checkout />
      </ProtectedRoute>} /> */}
      <Route path='payment' element={<Elements stripe={stripePromise}><Payment /></Elements>} />
      {/* <Route path='payment' element={<Payment/>} /> */}
      <Route path='order' element={<OrderSuccessful />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
    </Routes>
  );
};

export default Routers;

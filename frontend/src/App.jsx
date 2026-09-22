import React from 'react';
import { Routes,Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Home from './pages/Home.jsx';
import Products from './pages/Products.jsx';
import ProductDetails from './pages/ProductDetails.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Cart from './pages/Cart.jsx';
import Checkout from './pages/Checkout.jsx';
import Orders from './pages/Orders.jsx';
import OrderDetails from './pages/OrderDetails.jsx';
import Profile from './pages/Profile.jsx';
import Admin from './pages/Admin.jsx';

export default function App(){
 return <div className="app-shell"><Navbar/><Routes>
  <Route path="/" element={<Home/>}/><Route path="/products" element={<Products/>}/><Route path="/products/:id" element={<ProductDetails/>}/>
  <Route path="/login" element={<Login/>}/><Route path="/register" element={<Register/>}/><Route path="/cart" element={<Cart/>}/>
  <Route element={<ProtectedRoute/>}><Route path="/checkout" element={<Checkout/>}/><Route path="/orders" element={<Orders/>}/><Route path="/orders/:id" element={<OrderDetails/>}/><Route path="/profile" element={<Profile/>}/></Route>
  <Route element={<ProtectedRoute admin/>}><Route path="/admin" element={<Admin/>}/></Route>
 </Routes><Footer/></div>
}

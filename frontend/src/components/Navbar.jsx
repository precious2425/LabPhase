import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, UserCircle, LogOut, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useState } from 'react';

export default function Navbar() {
  const { count } = useCart();
  const { user, logout } = useAuth();
  const [mobile, setMobile] = useState(false);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  function submit(e) {
    e.preventDefault();
    navigate(`/products?search=${encodeURIComponent(search)}`);
    setMobile(false);
  }

  return <header className="navbar">
    <div className="container nav-inner">
      <Link to="/" className="brand"><span className="brand-mark">S</span> ShopSphere</Link>
      <nav className={`nav-links ${mobile ? 'open' : ''}`}>
        <NavLink to="/" onClick={() => setMobile(false)}>Home</NavLink>
        <NavLink to="/products" onClick={() => setMobile(false)}>Shop</NavLink>
        {user && <NavLink to="/orders" onClick={() => setMobile(false)}>Orders</NavLink>}
      </nav>
      <form className="nav-search" onSubmit={submit}>
        <Search size={18} />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..." />
      </form>
      <div className="nav-actions">
        {user ? <Link className="icon-link" to="/profile"><UserCircle size={21}/><span className="hide-sm">{user.name.split(' ')[0]}</span></Link> : <Link className="login-link" to="/login">Login</Link>}
        <Link className="cart-link" to="/cart"><ShoppingBag size={21}/><span className="cart-badge">{count}</span></Link>
        {user && <button className="icon-button hide-sm" onClick={logout} title="Logout"><LogOut size={19}/></button>}
        <button className="mobile-toggle" onClick={() => setMobile(!mobile)}>{mobile ? <X/> : <Menu/>}</button>
      </div>
    </div>
  </header>
}

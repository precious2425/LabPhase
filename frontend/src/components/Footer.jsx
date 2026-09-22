import React from 'react';
export default function Footer() {
  return <footer className="footer">
    <div className="container footer-grid">
      <div><div className="brand footer-brand"><span className="brand-mark">S</span> ShopSphere</div><p>Modern shopping made simple. Discover products you love and get them delivered.</p></div>
      <div><h4>Shop</h4><a href="/products">All Products</a><a href="/products?category=Fashion">Fashion</a><a href="/products?category=Electronics">Electronics</a></div>
      <div><h4>Customer Care</h4><span>Secure checkout</span><span>Order tracking</span><span>Easy support</span></div>
      <div><h4>Contact</h4><span>support@shopsphere.test</span><span>Lagos, Nigeria</span><span>Mon–Sat, 9am–6pm</span></div>
    </div>
    <div className="footer-bottom">© 2026 ShopSphere. Built with MongoDB, Express, React & Node.js.</div>
  </footer>
}

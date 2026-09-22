import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Star } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  return <article className="product-card">
    <Link to={`/products/${product._id}`} className="product-image-wrap">
      <img src={product.image} alt={product.name} className="product-image" />
      {product.featured && <span className="product-badge">Featured</span>}
    </Link>
    <div className="product-info">
      <span className="category-label">{product.category}</span>
      <Link to={`/products/${product._id}`}><h3>{product.name}</h3></Link>
      <div className="rating"><Star size={15} fill="currentColor" /> {product.rating.toFixed(1)}</div>
      <div className="product-bottom"><strong>₦{product.price.toLocaleString()}</strong><button className="add-mini" disabled={!product.stock} onClick={() => addToCart(product)}><ShoppingBag size={17} /> {product.stock ? 'Add' : 'Sold out'}</button></div>
    </div>
  </article>
}

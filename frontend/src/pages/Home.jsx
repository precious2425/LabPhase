import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, ShieldCheck, Headphones, RefreshCcw } from 'lucide-react';
import { useEffect, useState } from 'react';
import api from '../services/api.js';
import ProductCard from '../components/ProductCard.jsx';
import Spinner from '../components/Spinner.jsx';
import IntroSplash from '../components/IntroSplash.jsx';

const cats = [
  ['Fashion', 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800'],
  ['Electronics', 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800'],
  ['Shoes', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800'],
  ['Home', 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800']
];

export default function Home() {
  const [products, setProducts] = useState([]); const [loading, setLoading] = useState(true);
  useEffect(() => { api.get('/products?featured=true').then(r => setProducts(r.data)).finally(() => setLoading(false)) }, []);
  return <main>
    <IntroSplash />
    <section className="hero"><div className="container hero-grid"><div className="hero-copy"><span className="eyebrow">NEW SEASON • 2026</span><h1>Everything you want.<br /><em>All in one place.</em></h1><p>Discover fashion, electronics, home essentials and more. Curated products, simple checkout and a shopping experience built around you.</p><div className="hero-actions"><Link className="btn btn-primary" to="/products">Shop Collection <ArrowRight size={18} /></Link><Link className="btn btn-ghost" to="/products?sort=rating">Explore Top Rated</Link></div></div><div className="hero-art"><img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200" alt="Woman shopping" /><div className="hero-floating"><strong>4.9/5</strong><span>Customer rating</span></div></div></div></section>
    <section className="benefits"><div className="container benefit-grid"><div><Truck /><span><b>Fast delivery</b>Reliable shipping</span></div><div><ShieldCheck /><span><b>Secure shopping</b>Your data is protected</span></div><div><RefreshCcw /><span><b>Easy returns</b>Shop with confidence</span></div><div><Headphones /><span><b>Friendly support</b>We're here to help</span></div></div></section>
    <section className="section container"><div className="section-head"><div><span className="eyebrow">SHOP BY CATEGORY</span><h2>Find your style</h2></div><Link to="/products">View all <ArrowRight size={17} /></Link></div><div className="category-grid">{cats.map(([name, img]) => <Link className="category-card" to={`/products?category=${name}`} key={name}><img src={img} alt={name} /><div><h3>{name}</h3><span>Shop now <ArrowRight size={15} /></span></div></Link>)}</div></section>
    <section className="section section-soft"><div className="container"><div className="section-head"><div><span className="eyebrow">CURATED FOR YOU</span><h2>Featured products</h2></div><Link to="/products">See all products <ArrowRight size={17} /></Link></div>{loading ? <Spinner /> : <div className="product-grid">{products.slice(0, 8).map(p => <ProductCard product={p} key={p._id} />)}</div>}</div></section>
    <section className="promo container"><div><span className="eyebrow">LIMITED OFFER</span><h2>Free delivery on orders over ₦100,000</h2><p>Stock up on your favorites and let us handle the delivery.</p><Link className="btn btn-light" to="/products">Start shopping <ArrowRight size={17} /></Link></div><div className="promo-number">FREE<br />SHIP</div></section>
  </main>
}
import { useEffect,useState } from 'react';
import { Link,useNavigate,useParams } from 'react-router-dom';
import { ArrowLeft, Minus, Plus, ShoppingBag, Star } from 'lucide-react';
import api from '../services/api.js';
import { useCart } from '../context/CartContext.jsx';
import Spinner from '../components/Spinner.jsx';

export default function ProductDetails(){
 const {id}=useParams(); const [product,setProduct]=useState(null); const [qty,setQty]=useState(1); const {addToCart}=useCart(); const navigate=useNavigate();
 useEffect(()=>{api.get(`/products/${id}`).then(r=>setProduct(r.data)).catch(()=>setProduct(false))},[id]);
 if(product===null)return <div className="page-loading"><Spinner/></div>;
 if(product===false)return <div className="page container"><div className="empty-state"><h2>Product not found</h2><Link to="/products">Back to shop</Link></div></div>;
 return <main className="container page"><Link className="back-link" to="/products"><ArrowLeft size={17}/> Back to shop</Link><div className="detail-grid"><div className="detail-image"><img src={product.image} alt={product.name}/></div><div className="detail-copy"><span className="category-label">{product.category}</span><h1>{product.name}</h1><div className="detail-rating"><Star size={18} fill="currentColor"/> {product.rating.toFixed(1)} <span>• {product.stock} in stock</span></div><div className="detail-price">₦{product.price.toLocaleString()}</div><p>{product.description}</p><div className="qty-row"><span>Quantity</span><div className="qty"><button onClick={()=>setQty(q=>Math.max(1,q-1))}><Minus size={16}/></button><b>{qty}</b><button onClick={()=>setQty(q=>Math.min(product.stock,q+1))}><Plus size={16}/></button></div></div><button className="btn btn-primary btn-wide" disabled={!product.stock} onClick={()=>{addToCart(product,qty);navigate('/cart')}}><ShoppingBag size={18}/> {product.stock?'Add to cart':'Out of stock'}</button><div className="detail-note">Secure checkout • Fast delivery • Customer support</div></div></div></main>
}

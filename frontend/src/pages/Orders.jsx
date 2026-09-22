import { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Package } from 'lucide-react';
import api from '../services/api.js';
import Spinner from '../components/Spinner.jsx';

export default function Orders(){
 const [orders,setOrders]=useState([]); const [loading,setLoading]=useState(true);
 useEffect(()=>{api.get('/orders/my').then(r=>setOrders(r.data)).finally(()=>setLoading(false))},[]);
 return <main className="container page"><div className="page-title"><span className="eyebrow">MY ACCOUNT</span><h1>Order history</h1><p>Track your recent purchases.</p></div>{loading?<Spinner/>:orders.length?<div className="orders-list">{orders.map(o=><Link to={`/orders/${o._id}`} className="order-card" key={o._id}><div className="order-icon"><Package/></div><div><span className="muted">Order #{o._id.slice(-8).toUpperCase()}</span><h3>{o.items[0]?.name}{o.items.length>1?` + ${o.items.length-1} more`:''}</h3><span>{new Date(o.createdAt).toLocaleDateString()} • {o.items.reduce((s,i)=>s+i.quantity,0)} items</span></div><div className="order-right"><span className={`status status-${o.status.toLowerCase()}`}>{o.status}</span><b>₦{o.total.toLocaleString()}</b><ArrowRight size={18}/></div></Link>)}</div>:<div className="empty-state"><Package size={40}/><h2>No orders yet</h2><Link className="btn btn-primary" to="/products">Start shopping</Link></div>}</main>
}

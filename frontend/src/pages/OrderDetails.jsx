import { useEffect,useState } from 'react';
import { Link,useParams } from 'react-router-dom';
import { CheckCircle,MapPin } from 'lucide-react';
import api from '../services/api.js';
import Spinner from '../components/Spinner.jsx';

export default function OrderDetails(){
 const {id}=useParams(); const [order,setOrder]=useState(null);
 useEffect(()=>{api.get(`/orders/${id}`).then(r=>setOrder(r.data))},[id]);
 if(!order)return <div className="page-loading"><Spinner/></div>;
 return <main className="container page"><div className="success-head"><CheckCircle size={44}/><div><span className="eyebrow">ORDER CONFIRMED</span><h1>Thank you for your order!</h1><p>Order #{order._id.slice(-8).toUpperCase()}</p></div></div><div className="order-detail-grid"><div className="order-detail-main"><div className="panel"><div className="panel-head"><h2>Items</h2><span className={`status status-${order.status.toLowerCase()}`}>{order.status}</span></div>{order.items.map(i=><div className="detail-item" key={i.product}><img src={i.image}/><div><b>{i.name}</b><span>Qty: {i.quantity}</span></div><strong>₦{(i.price*i.quantity).toLocaleString()}</strong></div>)}</div><div className="panel"><div className="panel-head"><h2><MapPin size={19}/> Delivery address</h2></div><p>{order.shippingAddress.fullName}<br/>{order.shippingAddress.address}<br/>{order.shippingAddress.city}, {order.shippingAddress.state}<br/>{order.shippingAddress.country}<br/>{order.shippingAddress.phone}</p></div></div><aside className="summary"><h2>Summary</h2><div><span>Subtotal</span><b>₦{order.subtotal.toLocaleString()}</b></div><div><span>Shipping</span><b>{order.shippingFee?'₦'+order.shippingFee.toLocaleString():'Free'}</b></div><hr/><div className="summary-total"><span>Total</span><strong>₦{order.total.toLocaleString()}</strong></div><Link className="btn btn-primary btn-wide" to="/products">Continue shopping</Link></aside></div></main>
}

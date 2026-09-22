import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import api from '../services/api.js';
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function Checkout(){
 const {items,total,clearCart}=useCart(); const {user}=useAuth(); const navigate=useNavigate(); const [busy,setBusy]=useState(false); const [error,setError]=useState(''); const [form,setForm]=useState({fullName:user?.name||'',phone:user?.phone||'',address:user?.address||'',city:'Lagos',state:'Lagos',country:'Nigeria'});
 const shipping=total>=100000?0:5000;
 if(!items.length)return <main className="container page"><div className="empty-state"><h2>Your cart is empty</h2></div></main>;
 async function submit(e){e.preventDefault();setBusy(true);setError('');try{const {data}=await api.post('/orders',{items,shippingAddress:form});clearCart();navigate(`/orders/${data._id}`)}catch(err){setError(err.response?.data?.message||'Could not place order')}finally{setBusy(false)}}
 return <main className="container page"><div className="page-title"><span className="eyebrow">SECURE CHECKOUT</span><h1>Complete your order</h1></div><div className="checkout-layout"><form className="checkout-form" onSubmit={submit}><h2>Delivery information</h2>{error&&<div className="alert">{error}</div>}<div className="form-grid"><label>Full name<input required value={form.fullName} onChange={e=>setForm({...form,fullName:e.target.value})}/></label><label>Phone<input required value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/></label><label className="full">Address<input required value={form.address} onChange={e=>setForm({...form,address:e.target.value})}/></label><label>City<input required value={form.city} onChange={e=>setForm({...form,city:e.target.value})}/></label><label>State<input required value={form.state} onChange={e=>setForm({...form,state:e.target.value})}/></label></div><h2>Payment</h2><div className="payment-option"><CheckCircle size={19}/><div><b>Cash on Delivery</b><span>Pay when your order arrives.</span></div></div><button className="btn btn-primary btn-wide" disabled={busy}>{busy?'Placing order...':'Place order'}</button></form><aside className="summary"><h2>Your order</h2>{items.map(i=><div className="summary-product" key={i.product}><img src={i.image}/><span>{i.name} × {i.quantity}</span><b>₦{(i.price*i.quantity).toLocaleString()}</b></div>)}<hr/><div><span>Subtotal</span><b>₦{total.toLocaleString()}</b></div><div><span>Shipping</span><b>{shipping?'₦5,000':'Free'}</b></div><div className="summary-total"><span>Total</span><strong>₦{(total+shipping).toLocaleString()}</strong></div></aside></div></main>
}

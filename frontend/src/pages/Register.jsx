import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Register(){
 const {register}=useAuth(); const [form,setForm]=useState({name:'',email:'',password:''}); const [error,setError]=useState(''); const [busy,setBusy]=useState(false); const navigate=useNavigate();
 async function submit(e){e.preventDefault();setError('');setBusy(true);try{await register(form.name,form.email,form.password);navigate('/')}catch(err){setError(err.response?.data?.message||'Unable to create account')}finally{setBusy(false)}}
 return <main className="auth-page"><div className="auth-card"><Link to="/" className="brand auth-brand"><span className="brand-mark">S</span> ShopSphere</Link><h1>Create your account</h1><p>Join ShopSphere and start shopping.</p><form className="auth-form" onSubmit={submit}>{error&&<div className="alert">{error}</div>}<label>Full name<input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="John Doe"/></label><label>Email<input type="email" required value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="you@example.com"/></label><label>Password<input type="password" required minLength="6" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} placeholder="At least 6 characters"/></label><button className="btn btn-primary btn-wide" disabled={busy}>{busy?'Creating...':'Create account'}</button><p className="auth-switch">Already have an account? <Link to="/login">Sign in</Link></p></form></div></main>
}

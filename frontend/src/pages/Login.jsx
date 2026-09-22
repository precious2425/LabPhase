import { useState } from 'react';
import { Link,useLocation,useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Login(){
 const {login}=useAuth(); const [form,setForm]=useState({email:'',password:''}); const [error,setError]=useState(''); const [busy,setBusy]=useState(false); const navigate=useNavigate(); const location=useLocation();
 async function submit(e){e.preventDefault();setError('');setBusy(true);try{await login(form.email,form.password);navigate(location.state?.from||'/')}catch(err){setError(err.response?.data?.message||'Unable to sign in')}finally{setBusy(false)}}
 return <AuthLayout title="Welcome back" subtitle="Sign in to continue shopping."><form className="auth-form" onSubmit={submit}>{error&&<div className="alert">{error}</div>}<label>Email<input type="email" required value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="you@example.com"/></label><label>Password<input type="password" required value={form.password} onChange={e=>setForm({...form,password:e.target.value})} placeholder="••••••••"/></label><button className="btn btn-primary btn-wide" disabled={busy}>{busy?'Signing in...':'Sign in'}</button><p className="auth-switch">New here? <Link to="/register">Create an account</Link></p></form></AuthLayout>
}
function AuthLayout({title,subtitle,children}){return <main className="auth-page"><div className="auth-card"><Link to="/" className="brand auth-brand"><span className="brand-mark">S</span> ShopSphere</Link><h1>{title}</h1><p>{subtitle}</p>{children}</div></main>}

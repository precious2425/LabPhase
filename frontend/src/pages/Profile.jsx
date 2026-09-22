import { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import { UserCircle, LogOut, Package } from 'lucide-react';
import api from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';

export default function Profile(){
 const {user,setUser,logout}=useAuth(); const [form,setForm]=useState({name:'',phone:'',address:''}); const [saved,setSaved]=useState(false);
 useEffect(()=>{api.get('/users/profile').then(r=>setForm({name:r.data.name,phone:r.data.phone||'',address:r.data.address||''}))},[]);
 async function submit(e){e.preventDefault();const {data}=await api.put('/users/profile',form);setUser(data);localStorage.setItem('shopsphere_user',JSON.stringify(data));setSaved(true);setTimeout(()=>setSaved(false),2500)}
 return <main className="container page"><div className="profile-head"><div className="avatar"><UserCircle/></div><div><span className="eyebrow">MY ACCOUNT</span><h1>{user?.name}</h1><p>{user?.email}</p></div><button className="btn btn-outline" onClick={logout}><LogOut size={17}/> Logout</button></div><div className="profile-grid"><form className="panel profile-form" onSubmit={submit}><div className="panel-head"><h2>Personal details</h2>{saved&&<span className="saved">Saved!</span>}</div><label>Full name<input value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></label><label>Email<input disabled value={user?.email||''}/></label><label>Phone<input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder="+234..."/></label><label>Default address<textarea value={form.address} onChange={e=>setForm({...form,address:e.target.value})} rows="4"/></label><button className="btn btn-primary">Save changes</button></form><div className="profile-side"><Link to="/orders" className="account-link"><Package/><span><b>Order history</b><small>View and track your purchases</small></span></Link></div></div></main>
}

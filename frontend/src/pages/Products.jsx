import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal } from 'lucide-react';
import api from '../services/api.js';
import ProductCard from '../components/ProductCard.jsx';
import Spinner from '../components/Spinner.jsx';

const categories=['All','Fashion','Electronics','Shoes','Home'];

export default function Products(){
 const [params,setParams]=useSearchParams(); const [products,setProducts]=useState([]); const [loading,setLoading]=useState(true);
 const search=params.get('search')||''; const category=params.get('category')||'All'; const sort=params.get('sort')||'';
 useEffect(()=>{setLoading(true); const q=new URLSearchParams({search,category,sort}); api.get('/products?'+q.toString()).then(r=>setProducts(r.data)).finally(()=>setLoading(false))},[search,category,sort]);
 function update(key,value){const p=new URLSearchParams(params); if(value && value!=='All') p.set(key,value); else p.delete(key); setParams(p)}
 return <main className="container page"><div className="page-title"><div><span className="eyebrow">OUR STORE</span><h1>All products</h1><p>{search?`Results for "${search}"`:'Browse our complete collection.'}</p></div></div>
 <div className="shop-layout"><aside className="filters"><div className="filter-title"><SlidersHorizontal size={18}/> Filters</div><h4>Categories</h4>{categories.map(c=><button className={category===c?'active':''} onClick={()=>update('category',c)} key={c}>{c}</button>)}<h4>Sort by</h4><select value={sort} onChange={e=>update('sort',e.target.value)}><option value="">Newest</option><option value="price-asc">Price: Low to High</option><option value="price-desc">Price: High to Low</option><option value="rating">Top Rated</option></select></aside>
 <div className="shop-results"><div className="results-top"><span>{products.length} products</span><div className="mobile-filter">{category} • {sort||'Newest'}</div></div>{loading?<Spinner/>:<>{products.length?<div className="product-grid">{products.map(p=><ProductCard product={p} key={p._id}/>)}</div>:<div className="empty-state"><h3>No products found</h3><p>Try another search or category.</p></div>}</>}</div></div></main>
}

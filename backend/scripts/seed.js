import dotenv from 'dotenv';
import { connectDB } from '../config/db.js';
import Product from '../models/Product.js';

dotenv.config();
await connectDB();

const products = [
  { name:'Urban Runner Sneakers', description:'Comfortable everyday sneakers with a clean modern silhouette.', price:85000, category:'Shoes', image:'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=900', rating:4.8, stock:24, featured:true },
  { name:'Premium Wireless Headphones', description:'Immersive sound, soft ear cushions and long battery life.', price:120000, category:'Electronics', image:'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900', rating:4.7, stock:15, featured:true },
  { name:'Classic Leather Backpack', description:'A durable backpack for school, work and weekend travel.', price:65000, category:'Fashion', image:'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=900', rating:4.6, stock:30, featured:true },
  { name:'Minimal Smart Watch', description:'Track activity, notifications and daily routines in style.', price:145000, category:'Electronics', image:'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900', rating:4.5, stock:12, featured:true },
  { name:'Everyday Hoodie', description:'Soft heavyweight cotton hoodie designed for a relaxed fit.', price:45000, category:'Fashion', image:'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=900', rating:4.4, stock:40, featured:false },
  { name:'Modern Desk Lamp', description:'Warm adjustable lighting for a productive workspace.', price:38000, category:'Home', image:'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=900', rating:4.3, stock:22, featured:false },
  { name:'Ceramic Coffee Set', description:'Elegant cups and saucers for your morning coffee ritual.', price:28000, category:'Home', image:'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=900', rating:4.6, stock:18, featured:false },
  { name:'City Denim Jacket', description:'A timeless denim layer that works across seasons.', price:72000, category:'Fashion', image:'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=900', rating:4.5, stock:17, featured:true },
  { name:'Performance Running Shoes', description:'Lightweight cushioning for your daily runs and workouts.', price:98000, category:'Shoes', image:'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900', rating:4.9, stock:11, featured:true },
  { name:'Portable Bluetooth Speaker', description:'Compact speaker with rich audio for indoor and outdoor use.', price:55000, category:'Electronics', image:'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=900', rating:4.5, stock:27, featured:false },
  { name:'Scented Home Candle', description:'A relaxing fragrance candle for your living space.', price:18000, category:'Home', image:'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=900', rating:4.2, stock:35, featured:false },
  { name:'Structured Tote Bag', description:'Spacious everyday tote with a polished finish.', price:52000, category:'Fashion', image:'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=900', rating:4.4, stock:25, featured:false }
];

await Product.deleteMany({});
await Product.insertMany(products);
console.log(`Seeded ${products.length} products.`);
process.exit(0);
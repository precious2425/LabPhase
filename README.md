# ShopSphere — MERN Full-Stack E-Commerce Website

A complete MERN e-commerce starter project implementing the requested features:
- User registration/login with JWT authentication
- Browse products
- Product search and category filtering
- Product details
- Shopping cart
- Checkout and order creation
- User profile management
- Order history
- Admin product and order management
- MongoDB persistence through Mongoose
- Responsive React UI

## Requirements
- Node.js 18+
- MongoDB local installation OR a MongoDB Atlas connection string

## 1. Backend

```bash
cd backend
npm install
copy .env.example .env
```

On macOS/Linux:
```bash
cp .env.example .env
```

Edit `.env`:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/shopsphere
JWT_SECRET=replace_this_with_a_long_random_secret
CLIENT_URL=http://localhost:5173
```

Start the API:
```bash
npm run dev
```

Seed demo products:
```bash
npm run seed
```

The API runs at `http://localhost:5000`.

## 2. Frontend

Open another terminal:

```bash
cd frontend
npm install
copy .env.example .env
```

On macOS/Linux:
```bash
cp .env.example .env
```

Start React:
```bash
npm run dev
```

Open the URL shown by Vite, normally `http://localhost:5173`.

## Demo admin
After registering a normal account, change its role to `admin` directly in MongoDB if you want to test the admin dashboard.

## Main API routes

Auth:
- POST `/api/auth/register`
- POST `/api/auth/login`
- GET `/api/auth/me`

Products:
- GET `/api/products`
- GET `/api/products/:id`
- POST `/api/products` (admin)
- PUT `/api/products/:id` (admin)
- DELETE `/api/products/:id` (admin)

Orders:
- POST `/api/orders`
- GET `/api/orders/my`
- GET `/api/orders/:id`
- GET `/api/orders` (admin)
- PUT `/api/orders/:id/status` (admin)

Users:
- GET `/api/users/profile`
- PUT `/api/users/profile`

## Project structure

```text
mern-ecommerce/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── scripts/
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── .env.example
│   ├── index.html
│   └── package.json
└── README.md
```

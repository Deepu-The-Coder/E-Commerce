# ShopSphere 🛒

A fully functional E-Commerce website built with React (Vite) + Node.js + Express + MongoDB.

---

## 📁 Project Structure

```
E-Commerce/
├── client/          # React Vite frontend
└── server/          # Node.js Express backend
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (local or Atlas)
- npm

---

### 1. Clone / Open the project

```bash
cd E-Commerce
```

---

### 2. Backend Setup

```bash
cd server
npm install
```

Create `.env` file in `server/` (already created):
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/shopsphere
JWT_SECRET=shopsphere_jwt_secret_key_2024
NODE_ENV=development
```

Seed the database with 20 sample products:
```bash
npm run seed
```

Start the backend server:
```bash
npm run dev
```

Backend runs at: **http://localhost:5000**

---

### 3. Frontend Setup

```bash
cd client
npm install
npm run dev
```

Frontend runs at: **http://localhost:5173**

---

## 🌐 Pages

| Route              | Description              | Auth Required |
|--------------------|--------------------------|---------------|
| `/`                | Splash screen            | No            |
| `/home`            | Home page                | No            |
| `/products`        | Product listing          | No            |
| `/products/:id`    | Product detail           | No            |
| `/login`           | Login                    | No            |
| `/signup`          | Register                 | No            |
| `/forgot-password` | Forgot password          | No            |
| `/cart`            | Shopping cart            | ✅ Yes        |
| `/checkout`        | Checkout                 | ✅ Yes        |
| `/profile`         | User profile & orders    | ✅ Yes        |

---

## 🔌 API Endpoints

### Auth
| Method | Endpoint              | Description      |
|--------|-----------------------|------------------|
| POST   | `/api/auth/register`  | Register user    |
| POST   | `/api/auth/login`     | Login user       |
| GET    | `/api/auth/me`        | Get current user |

### Products
| Method | Endpoint              | Description        |
|--------|-----------------------|--------------------|
| GET    | `/api/products`       | Get all products   |
| GET    | `/api/products/:id`   | Get single product |

Query params for GET `/api/products`: `category`, `search`, `page`, `limit`

### Cart (Protected)
| Method | Endpoint              | Description        |
|--------|-----------------------|--------------------|
| GET    | `/api/cart`           | Get user cart      |
| POST   | `/api/cart`           | Add to cart        |
| PUT    | `/api/cart/:productId`| Update quantity    |
| DELETE | `/api/cart/:productId`| Remove item        |
| DELETE | `/api/cart/clear`     | Clear cart         |

### Orders (Protected)
| Method | Endpoint     | Description      |
|--------|--------------|------------------|
|POST    | `/api/orders`| Place order      |
| GET    | `/api/orders`| Get user orders  |

---

## 🗄️ Database Schemas

### User
```js
{ name, email, password, timestamps }
```

### Product
```js
{ title, description, price, category, image, rating, stock, timestamps }
```

### Order
```js
{ userId, products[], totalAmount, shippingAddress, status, timestamps }
```

### Cart
```js
{ userId, items[{ productId, quantity }], timestamps }
```

---

## 🛠️ Tech Stack

**Frontend:** React 18 (Vite), React Router DOM, Axios, Context API, Tailwind CSS, React Toastify, Lucide React

**Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT, bcryptjs

---

## 📦 Sample Product Categories

- **Electronics** (5 products): Headphones, iPad, Smartwatch, Mouse, Speaker
- **Fashion** (5 products): Shirts, Dress, Wallet, Hoodie, Denim Jacket  
- **Shoes** (5 products): Nike Air Max, Adidas Ultraboost, Canvas, Derby, Running
- **Books** (5 products): Atomic Habits, Psychology of Money, Deep Work, Alchemist, Clean Code

---

## 🔐 Authentication

- JWT stored in `localStorage`
- Token auto-attached via Axios interceptor
- Login persists across page refreshes
- Protected routes redirect to `/login`

---

## 📝 Notes

- Payment method: Cash on Delivery (COD)
- Free delivery on orders above ₹999
- All prices in Indian Rupees (₹)

# SaylaniMart - Modern MERN Stack E-Commerce Application (Frontend)

A complete, feature-rich, high-performance E-Commerce frontend built with **React**, **Vite**, **Tailwind CSS**, and **Lucide Icons**.

---

## 🌟 Key Application Features

### 🔐 Authentication & Role-Based Authorization
- **JWT & Local Storage Persistence**: Simulated JWT token issuance upon registration and login.
- **Dual User Roles**:
  - **Admin**: System Administrator access to statistics dashboard, user roles, product CRUD, and store orders.
  - **Customer**: Access to cart, wishlist, customer dashboard, and personal order tracking.
- **Quick Demo Switcher Bar**: Quick one-click demo credentials bar at the top of the app to switch between Admin (`admin@store.com`) and Customer (`zohaib@example.com`) without manual typing.

### 🛍️ Public Store & Catalog
- **Home Page**: Hero banner, live category filters, search, and real-time updating product cards. Any product added by the admin immediately appears on the home page.
- **Products Catalog Page**: Real-time category selection, price range slider ($10 - $500), search bar, and sorting (Newest, Price Low-to-High, Price High-to-Low).
- **Product Details Page**: High-resolution image showcase, stock quantity badge, category tags, quantity counter (`+`/`-`), Add to Cart, Wishlist button, and related product recommendations.

### 🛒 Shopping Cart & Wishlist
- **Slide-over Cart Drawer**: Slide-out cart drawer with quantity controls, individual price calculation, subtotal, shipping fee rules, and checkout CTA.
- **Wishlist (Favorites)**: Dedicated page to view saved products, quick transfer to cart, and removal.

### 💳 Special Unauthenticated Inline Checkout Flow
Strictly follows assignment requirements for the `/checkout` route:
- **Unauthenticated Users**:
  - Navigating to `/checkout` displays the page **without redirecting to login**.
  - Displays an **Inline Login Section** at the top.
  - The Checkout Form below is kept **disabled with a locked overlay**.
  - Upon successful inline login, the login banner hides, the form enables, user details auto-fill, and cart items are preserved for seamless order placement.
- **Authenticated Users**: Form auto-fills user name and email, validates shipping address/phone/city, places order, clears cart, and redirects to My Orders.

### 📊 Admin Portal
- **Admin Dashboard**: Live statistics for Total Users, Total Customers, Total Admins, Total Products, Total Orders, Total Revenue, Recent Orders table, and Recent Registered Users.
- **User Management**: Table displaying user credentials, registration dates, role badges, modal to change roles (Admin/Customer), and user deletion.
- **Product CRUD Management**: Modal interface to Add Product, Edit Product details, price, stock, description, preset/custom image URL upload, and Delete product.
- **Global Order Management**: View all customer orders, item details, shipping address, and update status dropdown (Pending, Processing, Shipped, Delivered, Cancelled).

---

## 🛠️ Architecture Breakdown: Backend vs Frontend

| Feature / Responsibility | Frontend (Built Now in React) | Backend (For Later Server Phase) |
| :--- | :--- | :--- |
| **User Interface & Routing** | React 18 + React Router DOM v6 | Node.js / Express API Server |
| **Styling & Aesthetics** | Tailwind CSS + Glassmorphism + Theme Toggle | N/A |
| **Authentication** | Simulated JWT token & `localStorage` session | Real `bcrypt` hashing + `jsonwebtoken` signing |
| **Database & Models** | Reactive React Context (`AuthContext`, `ProductContext`, `OrderContext`) | MongoDB Schemas (`User`, `Product`, `Order` models) |
| **Image Hosting** | High-res image URL / Cloudinary URL input selector | Cloudinary Node.js SDK upload middleware |
| **Order Processing** | Local order creation, stock decrement, cart clearing | MongoDB transaction saving & payment webhooks |

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation Steps

1. **Clone or Open Project Directory**:
   ```bash
   cd "d:\Programming\Projects\Zohaib Project"
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start Local Development Server**:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:3000`.

4. **Build Production Bundle**:
   ```bash
   npx vite build
   ```

---

## 🔑 Demo Account Credentials

| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | `admin@store.com` | `password123` |
| **Customer** | `zohaib@example.com` | `password123` |

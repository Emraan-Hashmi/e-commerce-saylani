export const initialUsers = [
  {
    id: "usr_admin_01",
    name: "System Admin",
    email: "admin@store.com",
    password: "password123",
    role: "admin",
    createdAt: "2026-01-10T10:00:00.000Z"
  },
  {
    id: "usr_cust_01",
    name: "Zohaib Ahmed",
    email: "zohaib@example.com",
    password: "password123",
    role: "customer",
    createdAt: "2026-02-15T14:30:00.000Z"
  },
  {
    id: "usr_cust_02",
    name: "Sarah Jenkins",
    email: "sarah@example.com",
    password: "password123",
    role: "customer",
    createdAt: "2026-03-01T09:15:00.000Z"
  },
  {
    id: "usr_cust_03",
    name: "Alex Morgan",
    email: "alex@example.com",
    password: "password123",
    role: "customer",
    createdAt: "2026-04-12T16:45:00.000Z"
  }
];

export const initialProducts = [
  {
    id: "prod_01",
    name: "SonicPro Wireless Noise-Cancelling Headphones",
    description: "Immerse yourself in pure studio sound with active noise cancellation, 40-hour battery life, and ultra-soft memory foam earcups.",
    price: 249.99,
    category: "Electronics",
    stock: 25,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
    createdAt: "2026-01-15T10:00:00.000Z"
  },
  {
    id: "prod_02",
    name: "Aura Smartwatch Series 5",
    description: "Track your health metrics, heart rate, sleep quality, and workouts with crystal clear AMOLED display and 7-day battery life.",
    price: 189.50,
    category: "Electronics",
    stock: 14,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80",
    createdAt: "2026-01-20T11:30:00.000Z"
  },
  {
    id: "prod_03",
    name: "Minimalist Leather Everyday Backpack",
    description: "Crafted from top-grain water-resistant leather with dedicated 15-inch laptop sleeve and hidden anti-theft security pocket.",
    price: 129.00,
    category: "Fashion",
    stock: 18,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80",
    createdAt: "2026-02-01T08:00:00.000Z"
  },
  {
    id: "prod_04",
    name: "Ergonomic Mechanical Keyboard RGB",
    description: "Custom tactile mechanical switches, per-key RGB backlighting, aluminum body frame, and wireless dual-mode Bluetooth connectivity.",
    price: 149.99,
    category: "Electronics",
    stock: 30,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80",
    createdAt: "2026-02-10T15:20:00.000Z"
  },
  {
    id: "prod_05",
    name: "AromaBlend Espresso Coffee Machine",
    description: "19-bar Italian pump pressure system with built-in milk frother, precision temperature PID, and programmable shot control.",
    price: 320.00,
    category: "Home & Living",
    stock: 8,
    image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800&auto=format&fit=crop&q=80",
    createdAt: "2026-02-18T12:00:00.000Z"
  },
  {
    id: "prod_06",
    name: "Polaris Polarized Designer Sunglasses",
    description: "Lightweight titanium frame with UV400 anti-glare polarized lenses designed for contemporary style and maximum comfort.",
    price: 79.95,
    category: "Accessories",
    stock: 45,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&auto=format&fit=crop&q=80",
    createdAt: "2026-03-05T09:10:00.000Z"
  },
  {
    id: "prod_07",
    name: "ProRun Light Cushion Sneakers",
    description: "Engineered breathable mesh upper with responsive foam midsole for long distance running and high intensity workout training.",
    price: 110.00,
    category: "Fashion",
    stock: 22,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80",
    createdAt: "2026-03-12T14:40:00.000Z"
  },
  {
    id: "prod_08",
    name: "UltraGrip Stainless Steel Hydro Bottle 1L",
    description: "Double-wall vacuum insulated water bottle keeping beverages cold for 24 hours or piping hot for 12 hours.",
    price: 34.50,
    category: "Accessories",
    stock: 60,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&auto=format&fit=crop&q=80",
    createdAt: "2026-03-20T17:00:00.000Z"
  }
];

export const initialOrders = [
  {
    id: "ORD-98214",
    userId: "usr_cust_01",
    customerName: "Zohaib Ahmed",
    customerEmail: "zohaib@example.com",
    phone: "+1 (555) 234-5678",
    address: "742 Evergreen Terrace",
    city: "Springfield",
    postalCode: "97477",
    notes: "Please leave package at front door.",
    items: [
      {
        id: "prod_01",
        name: "SonicPro Wireless Noise-Cancelling Headphones",
        price: 249.99,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80"
      },
      {
        id: "prod_06",
        name: "Polaris Polarized Designer Sunglasses",
        price: 79.95,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&auto=format&fit=crop&q=80"
      }
    ],
    totalAmount: 329.94,
    orderDate: "2026-03-25T11:20:00.000Z",
    status: "Delivered"
  },
  {
    id: "ORD-76192",
    userId: "usr_cust_02",
    customerName: "Sarah Jenkins",
    customerEmail: "sarah@example.com",
    phone: "+1 (555) 987-6543",
    address: "123 Innovation Way",
    city: "Austin",
    postalCode: "78701",
    notes: "",
    items: [
      {
        id: "prod_02",
        name: "Aura Smartwatch Series 5",
        price: 189.50,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80"
      }
    ],
    totalAmount: 189.50,
    orderDate: "2026-04-02T15:45:00.000Z",
    status: "Processing"
  }
];

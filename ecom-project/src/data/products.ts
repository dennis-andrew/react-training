export type ProductCategory =
  | "0-6-months"
  | "6-12-months"
  | "2-3-years"
  | "3-4-years";

export type Product = {
  id: number;
  name: string;
  description: string;
  color: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  badge?: string;
  badgeTone?: "sale" | "new";
  imageUrl: string;
};

export const products: Product[] = [
  {
    id: 1,
    name: "Syltherine",
    description: "Stylish cafe chair",
    color: "Beige",
    category: "0-6-months",
    price: 25000,
    originalPrice: 35000,
    badge: "-30%",
    badgeTone: "sale",
    imageUrl:
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    name: "Leviosa",
    description: "Stylish cafe chair",
    color: "Natural",
    category: "6-12-months",
    price: 25000,
    imageUrl:
      "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    name: "Lolito",
    description: "Luxury big sofa",
    color: "Green",
    category: "2-3-years",
    price: 70000,
    originalPrice: 140000,
    badge: "-50%",
    badgeTone: "sale",
    imageUrl:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 4,
    name: "Respira",
    description: "Outdoor bar table and stool",
    color: "Brown",
    category: "3-4-years",
    price: 5000,
    badge: "New",
    badgeTone: "new",
    imageUrl:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 5,
    name: "Grifo",
    description: "Night lamp",
    color: "Gold",
    category: "0-6-months",
    price: 15000,
    imageUrl:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 6,
    name: "Muggo",
    description: "Small mug",
    color: "White",
    category: "6-12-months",
    price: 1500,
    badge: "New",
    badgeTone: "new",
    imageUrl:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 7,
    name: "Pingky",
    description: "Cute bed set",
    color: "Grey",
    category: "2-3-years",
    price: 70000,
    originalPrice: 140000,
    badge: "-50%",
    badgeTone: "sale",
    imageUrl:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 8,
    name: "Potty",
    description: "Minimalist flower pot",
    color: "White",
    category: "3-4-years",
    price: 5000,
    badge: "New",
    badgeTone: "new",
    imageUrl:
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 9,
    name: "Syltherine Plus",
    description: "Dining accent chair",
    color: "Oak",
    category: "0-6-months",
    price: 28000,
    originalPrice: 35000,
    badge: "-20%",
    badgeTone: "sale",
    imageUrl:
      "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 10,
    name: "Leviosa Lounge",
    description: "Comfort lounge chair",
    color: "Cream",
    category: "6-12-months",
    price: 32000,
    imageUrl:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 11,
    name: "Margo",
    description: "Modern fabric sofa",
    color: "Blue",
    category: "2-3-years",
    price: 85000,
    originalPrice: 100000,
    badge: "-15%",
    badgeTone: "sale",
    imageUrl:
      "https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 12,
    name: "Nesto",
    description: "Oak bedside table",
    color: "Natural",
    category: "3-4-years",
    price: 19000,
    badge: "New",
    badgeTone: "new",
    imageUrl:
      "https://images.unsplash.com/photo-1532323544230-7191fd51bc1b?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 13,
    name: "Lumia",
    description: "Pendant lamp",
    color: "Black",
    category: "0-6-months",
    price: 9500,
    imageUrl:
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 14,
    name: "Asgard",
    description: "Three seat sofa",
    color: "Charcoal",
    category: "6-12-months",
    price: 125000,
    imageUrl:
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 15,
    name: "Cielo",
    description: "Minimal dining table",
    color: "Walnut",
    category: "2-3-years",
    price: 47500,
    badge: "New",
    badgeTone: "new",
    imageUrl:
      "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 16,
    name: "Maya",
    description: "Decorative planter",
    color: "Terracotta",
    category: "3-4-years",
    price: 3500,
    imageUrl:
      "https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=600&q=80",
  },
];

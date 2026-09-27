export const products = [
  { id: "linen-shirt", name: "Everyday Linen Shirt", category: "Clothing", price: 68, description: "A breathable, relaxed-fit linen shirt made for warm days and easy layering.", image: "/placeholder.jpg", options: ["XS", "S", "M", "L", "XL"], rating: 4.8 },
  { id: "studio-pants", name: "Studio Wide-Leg Pants", category: "Clothing", price: 92, description: "Soft structured cotton trousers with a relaxed, flattering silhouette.", image: "/placeholder.jpg", options: ["XS", "S", "M", "L"], rating: 4.7 },
  { id: "canvas-jacket", name: "Canvas Utility Jacket", category: "Clothing", price: 138, description: "A sturdy everyday layer with roomy pockets and a clean, modern cut.", image: "/placeholder.jpg", options: ["S", "M", "L", "XL"], rating: 4.9 },
  { id: "ribbed-knit", name: "Ribbed Knit Tank", category: "Clothing", price: 44, description: "A versatile ribbed essential with a soft hand feel and easy stretch.", image: "/placeholder.jpg", options: ["XS", "S", "M", "L"], rating: 4.6 },
  { id: "daily-tote", name: "Daily Canvas Tote", category: "Accessories", price: 36, description: "A durable carryall designed for commutes, market trips, and weekends away.", image: "/placeholder.jpg", options: ["Natural", "Black"], rating: 4.8 },
  { id: "leather-cardholder", name: "Leather Cardholder", category: "Accessories", price: 32, description: "Slim, pocket-sized storage in smooth vegetable-tanned leather.", image: "/placeholder.jpg", options: ["Tan", "Black", "Cobalt"], rating: 4.7 },
  { id: "everyday-cap", name: "Everyday Cap", category: "Accessories", price: 28, description: "An unstructured cotton cap with an adjustable back and subtle branding.", image: "/placeholder.jpg", options: ["Sand", "Navy"], rating: 4.5 },
  { id: "hoop-earrings", name: "Small Hoop Earrings", category: "Accessories", price: 54, description: "Lightweight polished hoops that pair with everything.", image: "/placeholder.jpg", options: ["Gold", "Silver"], rating: 4.9 },
  { id: "stoneware-mug", name: "Stoneware Morning Mug", category: "Home Goods", price: 24, description: "Hand-finished stoneware with a comfortable handle and a quiet glaze.", image: "/placeholder.jpg", options: ["Cloud", "Cobalt", "Sage"], rating: 4.8 },
  { id: "linen-throw", name: "Washed Linen Throw", category: "Home Goods", price: 110, description: "A lightweight, textured throw to soften a sofa, bed, or reading chair.", image: "/placeholder.jpg", options: ["Oat", "Blue", "Charcoal"], rating: 4.7 },
  { id: "desk-lamp", name: "Arc Desk Lamp", category: "Home Goods", price: 84, description: "A compact powder-coated lamp that brings focused light to your desk.", image: "/placeholder.jpg", options: ["White", "Black"], rating: 4.6 },
  { id: "ceramic-vase", name: "Bud Ceramic Vase", category: "Home Goods", price: 42, description: "A softly sculpted vase for a single stem or a small gathered bouquet.", image: "/placeholder.jpg", options: ["White", "Terracotta"], rating: 4.8 }
]

export const categories = ["All", "Clothing", "Accessories", "Home Goods"]

export function getProduct(id) { return products.find((product) => product.id === id) }

export function formatPrice(price) { return `$${price.toFixed(2)}` }

export function getRelatedProducts(product) { return products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 4) }

export function getImage(product, size = "800") { return `https://images.unsplash.com/photo-${product.category === "Clothing" ? "1525507119028-ed4c629a60a3" : product.category === "Accessories" ? "1523779917675-b6ed3a42a561" : "1513694203232-719a280e022f"}?auto=format&fit=crop&w=${size}&q=80` }

export function getCategoryImage(category) {
  const images = { Clothing: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=80", Accessories: "https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?auto=format&fit=crop&w=900&q=80", "Home Goods": "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=900&q=80" }
  return images[category]
} 

export function getProductImage(product, size = "800") { const ids = { "linen-shirt": "1525507119028-ed4c629a60a3", "studio-pants": "1506629905607-d9e87c5a4b3c", "canvas-jacket": "1551488831-00ddcb6c6bd3", "ribbed-knit": "1564257577054-20b9c07a2c5d", "daily-tote": "1544816155-12df9643f363", "leather-cardholder": "1627123424574-724758594e30", "everyday-cap": "1521369909029-1afed882baee", "hoop-earrings": "1535632066927-ab7c9ab60908", "stoneware-mug": "1514228742587-6b1558fcf93a", "linen-throw": "1586023492125-27b2c045efd7", "desk-lamp": "1507473885765-e6ed609c0c8c", "ceramic-vase": "1612196808214-b8e1d6145a8c" }; return `https://images.unsplash.com/photo-${ids[product.id]}?auto=format&fit=crop&w=${size}&q=80` }

export default products



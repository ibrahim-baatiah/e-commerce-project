"use client"

import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Menu, Search, ShoppingBag, X, Minus, Plus, Trash2, Star, ArrowRight, UserCircle, LogIn } from "lucide-react"
import { useState } from "react"
import { useCart } from "../context/cart-context"
import { formatPrice, getProductImage } from "../data/products"
import { useAuth } from "../context/AuthContext"

export function Header() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const { itemCount } = useCart()
  const { user, logOut } = useAuth()
  const router = useRouter()
  function submit(event) { event.preventDefault(); router.push(`/shop${query ? `?q=${encodeURIComponent(query)}` : ""}`); setOpen(false) }
  return <header className="site-header"><div className="container header-inner"><Link href="/" className="logo">Al-atas<span>.</span></Link><nav className={`main-nav ${open ? "is-open" : ""}`}><Link href="/" onClick={() => setOpen(false)}>Home</Link><Link href="/shop" onClick={() => setOpen(false)}>Shop</Link></nav><div className="header-actions"><form className="search-form" onSubmit={submit}><Search size={17}/><input aria-label="Search products" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search" /></form>{user ? <div className="account-menu"><details><summary aria-label={`Account menu for ${user.username}`}><UserCircle size={19}/><span>{user.username}</span></summary><button onClick={logOut}><LogIn size={15}/> Log Out</button></details></div> : <Link className="login-link" href="/auth"><LogIn size={17}/> Log In</Link>}<Link className="cart-link" href="/cart" aria-label={`Cart with ${itemCount} items`}><ShoppingBag size={21}/>{itemCount > 0 && <span className="cart-count">{itemCount}</span>}</Link><button className="menu-button" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}>{open ? <X size={22}/> : <Menu size={22}/>}</button></div></div></header>
}

export function Footer() { return <footer className="site-footer"><div className="container footer-inner"><div><Link href="/" className="logo">Al-atas<span>.</span></Link><p>Considered things for everyday living.</p></div><div className="footer-links"><Link href="/shop">Shop all</Link><Link href="/shop?category=Clothing">Clothing</Link><Link href="/shop?category=Home%20Goods">Home goods</Link><Link href="/cart">Cart</Link></div><p className="copyright">© 2026 Al-atas. Made for the everyday.</p></div></footer> }

export function ProductCard({ product }) { const { addItem } = useCart(); const [added, setAdded] = useState(false); function add() { addItem(product, product.options[0]); setAdded(true); setTimeout(() => setAdded(false), 1600) } return <article className="product-card"><Link href={`/product/${product.id}`} className="product-image-wrap"><img src={getProductImage(product)} alt={product.name}/><span className="product-category">{product.category}</span></Link><div className="product-info"><div><Link href={`/product/${product.id}`}><h3>{product.name}</h3></Link><p className="rating"><Star size={13} fill="currentColor"/> {product.rating}</p></div><strong>{formatPrice(product.price)}</strong></div><button className={`add-button ${added ? "added" : ""}`} onClick={add}>{added ? "Added to cart" : "Add to cart"}</button></article> }

export function QuantityControl({ quantity, onChange }) { return <div className="quantity-control"><button onClick={() => onChange(quantity - 1)} aria-label="Decrease quantity"><Minus size={14}/></button><span>{quantity}</span><button onClick={() => onChange(quantity + 1)} aria-label="Increase quantity"><Plus size={14}/></button></div> }

export function CartLine({ item }) { const { updateQuantity, removeItem } = useCart(); return <div className="cart-line"><img src={getProductImage({ id: item.productId, category: "Accessories" }, "240")} alt=""/><div className="cart-line-info"><Link href={`/product/${item.productId}`}><h3>{item.name}</h3></Link><p>Option: {item.option}</p><div className="cart-line-bottom"><QuantityControl quantity={item.quantity} onChange={(quantity) => updateQuantity(item.key, quantity)}/><button className="remove-button" onClick={() => removeItem(item.key)}><Trash2 size={15}/> Remove</button></div></div><strong>{formatPrice(item.price * item.quantity)}</strong></div> }

export function OrderSummary({ buttonLabel, onButton }) { const { subtotal } = useCart(); const shipping = subtotal > 100 || subtotal === 0 ? 0 : 8; return <aside className="order-summary"><h2>Order summary</h2><div className="summary-row"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div><div className="summary-row"><span>Shipping</span><span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span></div><div className="summary-total"><span>Total</span><strong>{formatPrice(subtotal + shipping)}</strong></div>{buttonLabel && <button className="primary-button full-width" onClick={onButton}>{buttonLabel}<ArrowRight size={17}/></button>}</aside> }

export function Stars({ rating }) { return <span className="rating stars">{[1,2,3,4,5].map((star) => <Star key={star} size={15} fill={star <= Math.round(rating) ? "currentColor" : "none"}/>)} <b>{rating}</b></span> }

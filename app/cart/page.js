"use client"
import Link from "next/link"
import { ArrowRight, ShoppingBag } from "lucide-react"
import { Header, Footer, CartLine, OrderSummary } from "../../components/storefront"
import { useCart } from "../../context/cart-context"

export default function CartPage() { const { items } = useCart(); return <><Header/><main className="container page-main"><div className="page-intro compact"><p className="eyebrow">Your selections</p><h1>Shopping bag</h1></div>{items.length === 0 ? <div className="empty-state cart-empty"><ShoppingBag size={34}/><h2>Your bag is feeling light.</h2><p>Find something considered for your everyday.</p><Link className="primary-button" href="/shop">Continue shopping <ArrowRight size={17}/></Link></div> : <div className="cart-layout"><div className="cart-items">{items.map((item) => <CartLine key={item.key} item={item}/>)}</div><OrderSummary buttonLabel="Proceed to checkout" onButton={() => window.location.href = "/checkout"}/></div>}</main><Footer/></> }

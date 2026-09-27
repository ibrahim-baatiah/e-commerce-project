"use client"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Check, ArrowRight } from "lucide-react"
import { Header, Footer } from "../../components/storefront"
import { formatPrice } from "../../data/products"

export default function ConfirmationPage() { const [order, setOrder] = useState(null); useEffect(() => { try { setOrder(JSON.parse(sessionStorage.getItem("al-atas-order"))) } catch {} }, []); const total = order?.items?.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0; return <><Header/><main className="container page-main confirmation"><div className="confirmation-mark"><Check size={28}/></div><p className="eyebrow">Thank you for your order</p><h1>It&apos;s on its way.</h1><p className="confirmation-copy">We&apos;ve received your order and will send a confirmation email with tracking details soon.</p>{order && <div className="confirmation-card"><div><span>Order number</span><strong>{order.number}</strong></div><div><span>Total</span><strong>{formatPrice(total)}</strong></div><div className="confirmation-items">{order.items.map((item) => <p key={item.key}>{item.quantity} × {item.name}<span>{formatPrice(item.price * item.quantity)}</span></p>)}</div></div>}<Link className="primary-button" href="/shop">Continue shopping <ArrowRight size={17}/></Link></main><Footer/></> }

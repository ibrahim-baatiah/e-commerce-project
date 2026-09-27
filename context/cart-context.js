"use client"

import { createContext, useContext, useEffect, useMemo, useState } from "react"

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState([])
  const [ready, setReady] = useState(false)

  useEffect(() => {
    try { setItems(JSON.parse(window.localStorage.getItem("al-atas-cart") || "[]")) } catch { setItems([]) }
    setReady(true)
  }, [])

  useEffect(() => { if (ready) window.localStorage.setItem("al-atas-cart", JSON.stringify(items)) }, [items, ready])

  function addItem(product, option, quantity = 1) {
    setItems((current) => {
      const key = `${product.id}-${option}`
      const existing = current.find((item) => item.key === key)
      if (existing) return current.map((item) => item.key === key ? { ...item, quantity: item.quantity + quantity } : item)
      return [...current, { key, productId: product.id, name: product.name, price: product.price, image: product.image, option, quantity }]
    })
  }
  function updateQuantity(key, quantity) { setItems((current) => current.map((item) => item.key === key ? { ...item, quantity: Math.max(1, quantity) } : item)) }
  function removeItem(key) { setItems((current) => current.filter((item) => item.key !== key)) }
  function clearCart() { setItems([]) }

  const value = useMemo(() => ({ items, addItem, updateQuantity, removeItem, clearCart, itemCount: items.reduce((total, item) => total + item.quantity, 0), subtotal: items.reduce((total, item) => total + item.price * item.quantity, 0) }), [items])
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() { return useContext(CartContext) }

import "./globals.css"
import { CartProvider } from "../context/cart-context"
import { AuthProvider } from "../context/AuthContext"

export const metadata = { title: "Al-atas — Good things for every day", description: "Thoughtfully made clothing, accessories, and home goods for everyday living." }

export default function RootLayout({ children }) { return <html lang="en"><body><AuthProvider><CartProvider>{children}</CartProvider></AuthProvider></body></html> }

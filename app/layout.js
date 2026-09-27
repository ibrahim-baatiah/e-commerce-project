import "./globals.css"
import { CartProvider } from "../context/cart-context"

export const metadata = { title: "Al-atas — Good things for every day", description: "Thoughtfully made clothing, accessories, and home goods for everyday living." }

export default function RootLayout({ children }) { return <html lang="en"><body><CartProvider>{children}</CartProvider></body></html> }

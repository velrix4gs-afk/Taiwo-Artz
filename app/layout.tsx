import './globals.css'
import { Inter, Playfair_Display } from 'next/font/google'
import { CartProvider } from '@/context/CartContext'
import Navbar from '@/components/Navbar'
import CartSidebar from '@/components/CartSidebar'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair'
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased bg-stone-50">
        <CartProvider>
          <Navbar />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">{children}</main>
          <CartSidebar />
        </CartProvider>
      </body>
    </html>
  )
}
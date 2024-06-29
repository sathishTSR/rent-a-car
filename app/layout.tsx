import { Footer, Navbar } from '@/components'
import './globals.css'
import type { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'Cars',
  description: 'Our Car, your Price',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: "black", color: "white" }} className={"relative"}>
        <Navbar/>
        {children}
        <Footer />
        </body>
    </html>
  )
}

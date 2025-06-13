'use client'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function SiteLayout({ children }) {
  return (
    <>
      <Header />
      <main className="pt-16">{children}</main>
      <Footer />
    </>
  )
}

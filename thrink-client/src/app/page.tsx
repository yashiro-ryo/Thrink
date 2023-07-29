'use client'

import MainPage from '@/components/pages/MainPage/MainPage'
import Footer from '@/components/ui-parts/Footer/Footer'
import NavbarComp from '@/components/ui-parts/Navbar/Navbar'

export default function Home() {
  return (
    <main>
      <NavbarComp />
      <MainPage />
      <Footer />
    </main>
  )
}

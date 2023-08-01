'use client'

import MainPage from '@/components/pages/MainPage/MainPage'
import Footer from '@/components/ui-parts/Footer/Footer'
import NavbarComp from '@/components/ui-parts/Navbar/Navbar'
import Log from '@/lib/logger'

export default function Home() {
  Log.v(process.env.NEXT_PUBLIC_APP_MODE)
  return (
    <main>
      <NavbarComp />
      <MainPage />
      <Footer />
    </main>
  )
}

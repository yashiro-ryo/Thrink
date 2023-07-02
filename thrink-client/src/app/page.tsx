'use client'

import Footer from '@/components/ui-parts/Footer/Footer'
import NavbarComp from '@/components/ui-parts/Navbar/Navbar'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { additional, subtraction } from '@/redux/slices/counterSlice'

export default function Home() {
  const count = useAppSelector((state) => state.counter.count)
  const dispatch = useAppDispatch()
  return (
    <main>
      <NavbarComp />
      {/* body */}
      <p>count: {count}</p>
      <button onClick={() => dispatch(additional(1))}>Up</button>
      <button onClick={() => dispatch(subtraction(1))}>Down</button>
      <Footer />
    </main>
  )
}

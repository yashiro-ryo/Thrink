'use client'
import StudentProfile from '@/components/pages/StudentProfile/StudentProfile'
import NavbarComp from '@/components/ui-parts/Navbar/Navbar'
import Footer from '@/components/ui-parts/Footer/Footer'

export default function UserProfile({ params }: { params: { uid: string } }) {
  return (
    <div>
      <NavbarComp />
      <StudentProfile uidStr={params.uid} />
      <Footer />
    </div>
  )
}

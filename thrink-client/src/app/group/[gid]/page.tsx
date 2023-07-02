'use client'
import GroupsProfile from '@/components/pages/GroupsProfile/GroupsProfile'
import NavbarComp from '@/components/ui-parts/Navbar/Navbar'
import Footer from '@/components/ui-parts/Footer/Footer'

export default function GroupProfile({ params }: { params: { gid: string } }) {
  return (
    <div>
      <NavbarComp />
      <GroupsProfile gidStr={params.gid} />
      <Footer />
    </div>
  )
}

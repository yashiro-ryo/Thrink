'use client'
import { Container } from 'react-bootstrap'
import SearchGroups from '@/components/pages/SearchGroups/SearchGroups'
import NavbarComp from '@/components/ui-parts/Navbar/Navbar'
import Footer from '@/components/ui-parts/Footer/Footer'
import styled from 'styled-components'

const BodyComp = styled(Container)`
  margin-top: 30px;
  margin-bottom: 30px;
`

export default function SearchGroupsPage() {
  return (
    <div>
      <NavbarComp />
      <BodyComp>
        <SearchGroups />
      </BodyComp>
      <Footer />
    </div>
  )
}

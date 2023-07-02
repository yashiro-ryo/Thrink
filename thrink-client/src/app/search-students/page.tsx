'use client'
import { Container } from 'react-bootstrap'
import SearchStudents from '@/components/pages/SearchStudents/SearchStudents'
import NavbarComp from '@/components/ui-parts/Navbar/Navbar'
import Footer from '@/components/ui-parts/Footer/Footer'
import styled from 'styled-components'

const BodyComp = styled(Container)`
  margin-top: 30px;
  margin-bottom: 30px;
`

export default function SearchStudentsPage() {
  return (
    <div>
      <NavbarComp />
      <BodyComp>
        <SearchStudents />
      </BodyComp>
      <Footer />
    </div>
  )
}

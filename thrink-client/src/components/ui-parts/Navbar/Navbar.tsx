'use client'
import Link from 'next/link'
import NavbarNotSignedIn from './NavbarNotSignedIn'
import { Navbar, Nav, Container } from 'react-bootstrap'
import styled from 'styled-components'
import { useAppSelector } from '@/redux/hooks'
import { useEffect } from 'react'
import NavbarSignedin from './NavbarSignedin'

const NavbarStyle = styled(Navbar)`
  background-color: #46ccd7;
`

const NavLink = styled(Nav.Link)`
  color: #fff;
  line-height: 40px;
  text-decoration: none;
  margin: 0 5px;
  &:hover {
    color: #f2f2f2;
  }
`

export default function NavbarComp() {
  const isSignedin = useAppSelector((state) => state.signinStateSwitcher.isSignedIn)
  const userProfile = useAppSelector((state) => state.userProfileReducer.profile)
  useEffect(() => {
    console.log(isSignedin)
    console.log(userProfile)
  }, [isSignedin, userProfile])
  return (
    <div>
      <NavbarStyle collapseOnSelect expand='lg' variant='dark'>
        <Container>
          <Navbar.Brand as={Link} href='/'>
            Thrink
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='me-auto'>
              <NavLink as={Link} href='/search-students'>
                大学生を探す
              </NavLink>
              <NavLink as={Link} href='/search-groups'>
                学校・団体を探す
              </NavLink>
              <NavLink as={Link} href='/articles'>
                記事一覧
              </NavLink>
            </Nav>
            <Nav>{isSignedin ? <NavbarSignedin /> : <NavbarNotSignedIn />}</Nav>
          </Navbar.Collapse>
        </Container>
      </NavbarStyle>
    </div>
  )
}

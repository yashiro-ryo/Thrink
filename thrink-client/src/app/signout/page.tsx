'use client'
import Footer from '@/components/ui-parts/Footer/Footer'
import styled from 'styled-components'
import { Navbar, Container } from 'react-bootstrap'
import Link from 'next/link'
import { useEffect } from 'react'
import { useAppSelector } from '@/redux/hooks'
import apiClient from '@/lib/http-common'

const NavbarStyle = styled(Navbar)`
  background-color: #46ccd7;
`

export default function Signout() {
  const userProfileMeta = useAppSelector((state) => state.userProfileMetaReducer.profileMeta)
  useEffect(() => {
    if (userProfileMeta === null) {
      return
    }
    apiClient.get('/auth/signout').then((res) => {
      console.log(res.data)
    })
  }, [userProfileMeta])
  return (
    <div>
      <NavbarStyle collapseOnSelect expand='lg' variant='dark'>
        <Container>
          <Navbar.Brand as={Link} href='/'>
            Thrink
          </Navbar.Brand>
        </Container>
      </NavbarStyle>
      <div>
        <Container>
          <h3>ログアウトしました。</h3>
          <a href='/'>ホームに戻る。</a>
        </Container>
      </div>
      <Footer />
    </div>
  )
}

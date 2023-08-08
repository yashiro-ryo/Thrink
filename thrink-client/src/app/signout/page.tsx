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
const ContentBody = styled.div`
  height: calc(100vh - 56px - 216px);
  padding: 30px 0;
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
          <Navbar.Brand href='/'>Thrink</Navbar.Brand>
        </Container>
      </NavbarStyle>
      <Container>
        <ContentBody>
          <h4>ログアウトしました。</h4>
          <a href='/'>ホームに戻る</a>
        </ContentBody>
      </Container>
      <Footer />
    </div>
  )
}

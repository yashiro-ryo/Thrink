'use client'
import Link from 'next/link'
import NavbarNotSignedIn from './NavbarNotSignedIn'
import { Navbar, Nav, Container } from 'react-bootstrap'
import styled from 'styled-components'
import { useAppSelector } from '@/redux/hooks'
import { useEffect } from 'react'
import NavbarSignedin from './NavbarSignedin'
import apiClient from '@/lib/http-common'
import { useDispatch } from 'react-redux'
import { saveUserProfileMeta } from '@/redux/slices/userProfileMetaSlice'
import { signin } from '@/redux/slices/signedinStateSlice'
import { UserProfileMetaWithoutSecureData } from '@/values/UserProfileMeta'
import Log from '@/lib/logger'

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
  const userProfileMeta = useAppSelector((state) => state.userProfileMetaReducer.profileMeta)
  const dispatch = useDispatch()
  useEffect(() => {
    // client側にキャッシュが存在しない場合
    if (userProfileMeta === null) {
      Log.v('client cache none')
      // server側へ問い合わせ
      apiClient
        .get('/auth/signin')
        .then((res) => {
          Log.v(res.data.userProfileMeta)
          dispatch(signin())
          dispatch(saveUserProfileMeta(res.data.userProfileMeta))
        })
        .catch((err) => {
          // do nothing
        })
    } else {
      // cacheが存在する場合はsinginのAPIを送信しない
      Log.v('client cache exist')
      Log.v(userProfileMeta)
    }
  }, [])
  const filterIconImgUrl = (userProfileMeta: UserProfileMetaWithoutSecureData) => {
    if (userProfileMeta === null) {
      return '/user-blank.png'
    }
    if (userProfileMeta.iconImgUrl === null) {
      return '/user-blank.png'
    }
    if (userProfileMeta.iconImgUrl.length === 0) {
      return '/user-blank.png'
    } else {
      return userProfileMeta.iconImgUrl
    }
  }
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
              <NavLink as={Link} href='/groups'>
                学校・団体を探す
              </NavLink>
              <NavLink as={Link} href='/students'>
                大学生を探す
              </NavLink>
              <NavLink as={Link} href='/articles'>
                記事一覧
              </NavLink>
            </Nav>
            <Nav>
              {isSignedin && userProfileMeta ? (
                <NavbarSignedin
                  userType={userProfileMeta.userType}
                  iconImgUrl={filterIconImgUrl(userProfileMeta)}
                />
              ) : (
                <NavbarNotSignedIn />
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </NavbarStyle>
    </div>
  )
}

import Link from 'next/link'
import { Nav } from 'react-bootstrap'
import styled from 'styled-components'

const NavLink = styled(Nav.Link)`
  color: #fff;
  line-height: 40px;
  text-decoration: none;
  margin: 0 5px;
  &:hover {
    color: #f2f2f2;
  }
`

export default function NavbarNotSignedIn() {
  return (
    <>
      <NavLink as={Link} href='/signin'>
        ログイン
      </NavLink>
      <NavLink as={Link} href='/signup'>
        アカウント作成
      </NavLink>
    </>
  )
}

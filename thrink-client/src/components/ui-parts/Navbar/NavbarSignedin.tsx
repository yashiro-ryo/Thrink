import { AiFillMessage } from 'react-icons/ai'
import { IoIosNotifications } from 'react-icons/io'
import { IconContext } from 'react-icons'
import { Image, NavDropdown } from 'react-bootstrap'
import { styled } from 'styled-components'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const DivWrapper = styled.div`
  display: flex;
`
const IconWrapper = styled.div`
  width: 30px;
  margin-right: 10px;
  &:hover {
    cursor: pointer;
  }
`
const NavDropdownStyle = styled(NavDropdown)`
  width: 30px;
  > a {
    padding: 0;
  }
  > .dropdown-menu {
    left: -95px;
  }
`

export default function NavbarSignedin() {
  // FIXME next/linkのLinkを使用するように修正する
  // FIXME iconの配置が微妙
  const router = useRouter()
  const redirect = (to: string) => {
    router.push(`${to}`)
  }
  return (
    <DivWrapper>
      <IconContext.Provider value={{ size: '25px' }}>
        <IconWrapper onClick={() => redirect('/chat')}>
          <AiFillMessage />
        </IconWrapper>
        <IconWrapper onClick={() => redirect('/notification')}>
          <IoIosNotifications />
        </IconWrapper>
        <NavDropdownStyle
          title={
            <Image
              src='/user-blank.png'
              roundedCircle
              alt='ユーザーのプロフィール画像'
              width={'30px'}
              height={'30px'}
            />
          }
        >
          <NavDropdown.Item as={Link} href='/profile'>
            プロフィール
          </NavDropdown.Item>
          <NavDropdown.Item as={Link} href='/settings'>
            設定
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item as={Link} href='/signout'>
            ログアウト
          </NavDropdown.Item>
        </NavDropdownStyle>
      </IconContext.Provider>
    </DivWrapper>
  )
}

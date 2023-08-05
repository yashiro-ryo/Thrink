import { AiFillMessage } from 'react-icons/ai'
import { IoIosNotifications } from 'react-icons/io'
import { IconContext } from 'react-icons'
import { Image, NavDropdown } from 'react-bootstrap'
import { styled } from 'styled-components'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import apiClient from '@/lib/http-common'

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

type Props = {
  userType: 0 | 1 | 2
  iconImgUrl: string
}

export default function NavbarSignedin(props: Props) {
  // FIXME next/linkのLinkを使用するように修正する
  // FIXME iconの配置が微妙
  const router = useRouter()
  const redirect = (to: string) => {
    router.push(`${to}`)
  }
  const signout = () => {
    apiClient.get('/auth/signout').then((res) => {
      console.log(res.data)
      if (res.data.status === 'done') {
        window.location.href =
          process.env.NEXT_PUBLIC_APP_MODE === 'dev'
            ? 'http://localhost:3001'
            : 'https://thrink.net'
      }
    })
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
              src={props.iconImgUrl}
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
          {props.userType === 1 ? (
            <NavDropdown.Item as={Link} href='/manage/job'>
              求人管理
            </NavDropdown.Item>
          ) : (
            ''
          )}
          <NavDropdown.Item as={Link} href='/settings'>
            設定
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={() => signout()}>ログアウト</NavDropdown.Item>
        </NavDropdownStyle>
      </IconContext.Provider>
    </DivWrapper>
  )
}

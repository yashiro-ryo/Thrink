'use client'
import Link from 'next/link'
import { Container } from 'react-bootstrap'
import styled from 'styled-components'

const FooterStyle = styled.div`
  background-color: #f3f8fb;
  padding-top: 20px;
  padding-bottom: 20px;
  * {
    color: #000;
  }
`

const ProductName = styled.div`
  display: flex;
  small {
    margin-left: 5px;
    line-height: 40px;
  }
`

const FooterListComp = styled.ul`
  list-style: none;
  padding-left: 0;
  a {
    text-decoration: none;
    &:hover {
      color: #636363;
    }
  }
`

const CopyRights = styled.div`
  small {
    color: #636363;
  }
`

export default function Footer() {
  return (
    <FooterStyle>
      <Container>
        <ProductName>
          <h3>Thrink</h3>
          <small>大学生と学校・団体をつなぐプラットフォーム</small>
        </ProductName>
        <div>
          <FooterListComp>
            <li>
              <Link href='/'>ホーム</Link>
            </li>
            <li>
              <Link href='/students'>大学生を探す</Link>
            </li>
            <li>
              <Link href='/groups'>学校・団体を探す</Link>
            </li>
            <li>
              <Link href='#articles'>記事一覧</Link>
            </li>
          </FooterListComp>
        </div>
        <CopyRights>
          <small>Copyright © {new Date().getFullYear()} Thrink, Inc. All rights Reserved.</small>
        </CopyRights>
      </Container>
    </FooterStyle>
  )
}

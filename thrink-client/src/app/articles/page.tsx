'use client'
import Footer from '@/components/ui-parts/Footer/Footer'
import NavbarComp from '@/components/ui-parts/Navbar/Navbar'
import { Container, Card } from 'react-bootstrap'
import styled from 'styled-components'

const ContentWrapper = styled.div`
  margin: 40px 0;
`

export default function Articles() {
  /**
   * このページは開発中です。
   */
  return (
    <div>
      <NavbarComp />
      <ContentWrapper>
        <Container>
          <h4>記事一覧 ( n 件)</h4>
          <ul>
            <li>
              <h5>記事1</h5>
              <p>作成者/作成日</p>
            </li>
            <li>
              <h5>記事2</h5>
              <p>作成者/作成日</p>
            </li>
            <li>
              <h5>記事3</h5>
              <p>作成者/作成日</p>
            </li>
          </ul>
        </Container>
      </ContentWrapper>
      <Footer />
    </div>
  )
}

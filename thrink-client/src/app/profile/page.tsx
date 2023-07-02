'use client'
import { Card, Container, Button } from 'react-bootstrap'
import NavbarComp from '@/components/ui-parts/Navbar/Navbar'
import Footer from '@/components/ui-parts/Footer/Footer'
import { styled } from 'styled-components'

const ContainerStyle = styled(Container)`
  margin-top: 50px;
  margin-bottom: 50px;
`

export default function UserProfile() {
  return (
    <div>
      <NavbarComp />
      <ContainerStyle>
        <Card>
          <Card.Header>プロフィール</Card.Header>
          <Card.Body>
            <Button variant='primary'>編集する</Button>
            <Card.Title>自己紹介</Card.Title>
            <Card.Text></Card.Text>
            <Card.Title>経歴</Card.Title>
            <Card.Text></Card.Text>
            <Card.Title>リンク</Card.Title>
            <Card.Text></Card.Text>
          </Card.Body>
        </Card>
      </ContainerStyle>
      <Footer />
    </div>
  )
}

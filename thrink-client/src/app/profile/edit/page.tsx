'use client'
import NavbarComp from '@/components/ui-parts/Navbar/Navbar'
import Footer from '@/components/ui-parts/Footer/Footer'
import { Container, Form, Button, Card, Image } from 'react-bootstrap'
import styled from 'styled-components'
import { useState } from 'react'

const StyledContainer = styled(Container)`
  margin-top: 30px;
  margin-bottom: 30px;
`

const StyledHeaderImage = styled(Image)`
  width: 100%;
  max-width: 700px;
  margin-bottom: 20px;
`

const StyledUserImage = styled(Image)`
  width: 100px;
  height: 100px;
  margin-top: 20px;
  margin-bottom: 20px;
`

const FormGroup = styled(Form.Group)`
  display: flex;
  flex-direction: column;
`
export default function EditProfile() {
  const [iconImageUrl, setIconUrl] = useState('/user-blank.png')
  const [headerImageUrl, setHeaderImageUrl] = useState('/header-blank.png')
  // anyなおす
  const onChangeIconInput = (e: any) => {
    const file = e.target.files[0]
    console.log(file)
    if (file === undefined) {
      console.log('cannnot load file info')
      return
    }
    setIconUrl(URL.createObjectURL(file))
    URL.revokeObjectURL(file)
  }
  // anyなおす
  const onChangeHeaderImageInput = (e: any) => {
    const file = e.target.files[0]
    console.log(file)
    if (file === undefined) {
      console.log('cannnot load file info')
      return
    }
    setHeaderImageUrl(URL.createObjectURL(file))
    URL.revokeObjectURL(file)
  }
  return (
    <div>
      <NavbarComp />
      <StyledContainer>
        <Card>
          <Card.Header>プロフィール編集</Card.Header>
          <Card.Body>
            <Form>
              <FormGroup className='mb-3'>
                <Form.Label>ヘッダー写真</Form.Label>
                <StyledHeaderImage src={headerImageUrl} alt='ヘッダー画像' />
                <Form.Control
                  type='file'
                  accept='image/png, image/jpeg'
                  onChange={onChangeHeaderImageInput}
                />
              </FormGroup>
              <FormGroup className='mb-3'>
                <Form.Label>アイコン画像</Form.Label>
                <StyledUserImage
                  src={iconImageUrl}
                  alt='アイコン画像'
                  width={'98px'}
                  height={'98px'}
                />
                <Form.Control
                  type='file'
                  accept='image/png, image/jpeg'
                  onChange={onChangeIconInput}
                />
              </FormGroup>
              <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
                <Form.Label>自己紹介</Form.Label>
                <Form.Control as='textarea' rows={3} />
              </Form.Group>
              <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
                <Form.Label>経歴</Form.Label>
                <Form.Control as='textarea' rows={3} />
              </Form.Group>
              <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
                <Form.Label>リンク一覧</Form.Label>
                <Form.Control as='textarea' rows={3} />
              </Form.Group>
              <Button variant='primary'>保存する</Button>
            </Form>
          </Card.Body>
        </Card>
      </StyledContainer>
      <Footer />
    </div>
  )
}

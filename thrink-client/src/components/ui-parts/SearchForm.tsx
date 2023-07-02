import { Card, Accordion, Form, Button, Col, Row } from 'react-bootstrap'
import styled from 'styled-components'

const SearchButton = styled(Button)`
  width: 100px;
`

type Props = {
  searchType: 'student' | 'group' | 'other'
}

export default function SearchForm(props: Props) {
  const placeholder = (): string => {
    if (props.searchType === 'student') {
      return '学生や所属など'
    } else if (props.searchType === 'group') {
      return '活動内容や募集内容など'
    } else {
      return ''
    }
  }
  return (
    <Card>
      <Card.Header>キーワード検索</Card.Header>
      <Card.Body>
        <Form className='d-flex'>
          <Form.Control
            type='search'
            placeholder={placeholder()}
            className='me-2'
            aria-label='Search'
          />
          <SearchButton variant='primary'>検索</SearchButton>
        </Form>
      </Card.Body>
      <Accordion>
        <Accordion.Item eventKey='1'>
          <Accordion.Header>詳細検索条件</Accordion.Header>
          <Accordion.Body>
            <Form>
              <Form.Group as={Row} className='mb-3'>
                <Form.Label column sm={2}>
                  所在地
                </Form.Label>
                <Col sm={10}>
                  <Form.Control type='text' placeholder='所在地' />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className='mb-3'>
                <Form.Label column sm={2}>
                  詳細条件
                </Form.Label>
                <Col sm={{ span: 10 }}>
                  <Form.Check label='全国大会経験あり' />
                  <Form.Check label='県大会優勝経験あり' />
                  <Form.Check label='部活動指導経験あり' />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className='mb-3'>
                <Col sm={{ span: 10, offset: 2 }}>
                  <SearchButton type='submit'>検索</SearchButton>
                </Col>
              </Form.Group>
            </Form>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Card>
  )
}

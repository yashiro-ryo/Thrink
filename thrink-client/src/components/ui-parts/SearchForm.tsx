import { useState } from 'react'
import { Card, Form, Button } from 'react-bootstrap'
import styled from 'styled-components'

const SearchButton = styled(Button)`
  width: 100px;
`
type Props = {
  searchType: 'student' | 'group' | 'other'
  searchCb: (query: string) => void
}

export default function SearchForm(props: Props) {
  const [inputQuery, setInputQuery] = useState('')
  const onChangeInput = (e: any) => {
    setInputQuery(e.target.value)
  }
  const handleKeyDown = (e: { key: string; preventDefault: () => void }) => {
    if (e.key === 'Enter') {
      e.preventDefault()
    }
  }
  return (
    <Card>
      <Card.Header>キーワード検索</Card.Header>
      <Card.Body>
        <Form className='d-flex'>
          <Form.Control
            type='search'
            placeholder='活動内容や募集内容など'
            className='me-2'
            onChange={onChangeInput}
            value={inputQuery}
            aria-label='Search'
            onKeyDown={handleKeyDown}
          />
          <SearchButton variant='primary' onClick={() => props.searchCb(inputQuery)}>
            検索
          </SearchButton>
        </Form>
      </Card.Body>
    </Card>
  )
}

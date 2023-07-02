import { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import SearchForm from '@/components/ui-parts/SearchForm'
import GroupsList from '@/components/ui-parts/GroupsList/GroupsList'
import styled from 'styled-components'
import axios from 'axios'
import { Group } from '@/values/Groups'

const HeaderLabel = styled.div`
  margin-top: 20px;
  border-bottom: 1px solid #636363;
`

export default function SearchGroups() {
  const [groups, setGroups] = useState<Array<Group>>([])
  const getGroups = () => {
    axios.get('http://localhost:3000/v1/groups').then((res: any) => {
      setGroups(res.data)
    })
  }
  useEffect(() => {
    getGroups()
  }, [])
  return (
    <Container>
      {/* 検索ふぉーむ */}
      <SearchForm searchType='group' />
      {/* カード一覧 */}
      <HeaderLabel>
        <h5>団体一覧({groups.length}件)</h5>
      </HeaderLabel>
      <GroupsList groups={groups} />
    </Container>
  )
}

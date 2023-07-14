import { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import SearchForm from '@/components/ui-parts/SearchForm'
import GroupsList from '@/components/ui-parts/GroupsList/GroupsList'
import styled from 'styled-components'
import apiClient from '@/lib/http-common'
import { GroupDigest } from '@/values/Groups'

const HeaderLabel = styled.div`
  margin-top: 20px;
  border-bottom: 1px solid #636363;
`

export default function SearchGroups() {
  const [groupsDigests, setGroupsDigests] = useState<Array<GroupDigest>>([])
  const getGroupsDigests = () => {
    apiClient.get('/v1/digests/group?pageIndex=1').then((res: any) => {
      setGroupsDigests(res.data.groupDigests)
    })
  }
  useEffect(() => {
    getGroupsDigests()
  }, [])
  return (
    <Container>
      {/* 検索ふぉーむ */}
      <SearchForm searchType='group' />
      {/* カード一覧 */}
      <HeaderLabel>
        <h5>団体一覧({groupsDigests.length}件)</h5>
      </HeaderLabel>
      <GroupsList groupsDigests={groupsDigests} />
    </Container>
  )
}

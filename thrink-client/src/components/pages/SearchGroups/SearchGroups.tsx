import { useEffect, useState } from 'react'
import { Container, Pagination } from 'react-bootstrap'
import SearchForm from '@/components/ui-parts/SearchForm'
import GroupsList from '@/components/ui-parts/GroupsList/GroupsList'
import styled from 'styled-components'
import apiClient from '@/lib/http-common'
import { GroupDigest } from '@/values/Groups'
import { useRouter, useSearchParams } from 'next/navigation'
import { getPageIndex } from '@/lib/pagination'

const StyledContainer = styled(Container)`
  min-height: calc(100vh - 56px - 216px - 60px);
`
const HeaderLabel = styled.div`
  margin-top: 20px;
  border-bottom: 1px solid #636363;
`
const PaginationWrapper = styled(Pagination)`
  margin: 20px auto 0 auto;
`

export default function SearchGroups() {
  const [groupsDigests, setGroupsDigests] = useState<Array<GroupDigest>>([])
  const [pageLenght, setPageLength] = useState(1)
  const [nowPageIndex, setNowPageIndex] = useState(1)
  const [isPagingMode, setPagingMode] = useState(true)

  const router = useRouter()
  const searchParams = useSearchParams()

  const getGroupsDigests = (pageIndex: number) => {
    apiClient.get(`/v1/digests/group?pageIndex=${pageIndex}`).then((res: any) => {
      setGroupsDigests(res.data.groupDigests)
      setPageLength(res.data.pageLength)
      setNowPageIndex(getPageIndex(pageIndex, res.data.pageLength))
    })
  }
  const searchGroup = (query: string) => {
    if (query.length === 0) {
      setPagingMode(true)
      setNowPageIndex(1)
      getGroupsDigests(1)
      return
    }
    setPagingMode(false)
    apiClient
      .post(`/v1/digests/group/search`, {
        query,
      })
      .then((res) => {
        setGroupsDigests(res.data.groupDigests)
      })
  }
  useEffect(() => {
    const pageIndex = searchParams.get('pageIndex')
    const pageIndexNum = pageIndex === null || pageIndex.length === 0 ? 1 : Number(pageIndex)
    getGroupsDigests(pageIndexNum)
  }, [])

  let items = []
  for (let number = 1; number <= pageLenght; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === nowPageIndex}
        onClick={() => {
          getGroupsDigests(number)
          router.push(`/groups?pageIndex=${number}`)
        }}
      >
        {number}
      </Pagination.Item>,
    )
  }
  return (
    <StyledContainer>
      {/* 検索ふぉーむ */}
      <SearchForm searchType='group' searchCb={searchGroup} />
      {/* カード一覧 */}
      <HeaderLabel>
        <h5>
          団体一覧({nowPageIndex}ページ {groupsDigests.length}件)
        </h5>
      </HeaderLabel>
      <GroupsList groupsDigests={groupsDigests} />
      {isPagingMode ? <PaginationWrapper>{items}</PaginationWrapper> : ''}
    </StyledContainer>
  )
}

import { useEffect, useState } from 'react'
import { Container, Pagination } from 'react-bootstrap'
import StudentsList from '../../ui-parts/StudentsList/StudentsList'
import styled from 'styled-components'
import apiClient from '@/lib/http-common'
import { StudentDigest } from '@/values/Students'
import { useRouter, useSearchParams } from 'next/navigation'
import { getPageIndex } from '@/lib/pagination'

const HeaderLabel = styled.div`
  margin-top: 20px;
  border-bottom: 1px solid #636363;
`
const PaginationWrapper = styled(Pagination)`
  margin: 20px auto 0 auto;
`

export default function SearchStudents() {
  const [studentDigests, setStudentDigests] = useState<Array<StudentDigest>>([])
  const [pageLength, setPageLength] = useState(1)
  const [nowPageIndex, setNowPageIndex] = useState(1)
  const searchParams = useSearchParams()
  const router = useRouter()
  const getAllStudents = (pageIndex: number) => {
    apiClient.get(`/v1/digests/student?pageIndex=${pageIndex}`).then((res: any) => {
      if (!('studentDigests' in res.data)) {
        setStudentDigests([])
        return
      }
      setStudentDigests(res.data.studentDigests)
      setPageLength(res.data.pageLength)
      setNowPageIndex(getPageIndex(pageIndex, res.data.pageLength))
    })
  }
  useEffect(() => {
    const pageIndex = searchParams.get('pageIndex')
    const pageIndexNumber = pageIndex === null || pageIndex.length === 0 ? 1 : Number(pageIndex)
    getAllStudents(pageIndexNumber)
  }, [])

  let items = []
  for (let number = 1; number <= pageLength; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === nowPageIndex}
        onClick={() => {
          getAllStudents(number)
          router.push(`/students?pageIndex=${number}`)
        }}
      >
        {number}
      </Pagination.Item>,
    )
  }
  return (
    <Container>
      {/* カード一覧 */}
      <HeaderLabel>
        <h5>
          大学生一覧({nowPageIndex}ページ {studentDigests.length}人)
        </h5>
      </HeaderLabel>
      <StudentsList studentDigests={studentDigests} />
      <PaginationWrapper>{items}</PaginationWrapper>
    </Container>
  )
}

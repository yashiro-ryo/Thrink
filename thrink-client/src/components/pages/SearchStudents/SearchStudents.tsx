import { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import SearchForm from '../../ui-parts/SearchForm'
import StudentsList from '../../ui-parts/StudentsList/StudentsList'
import styled from 'styled-components'
import axios from 'axios'
import { StudentDigest } from '@/values/Students'

const HeaderLabel = styled.div`
  margin-top: 20px;
  border-bottom: 1px solid #636363;
`

export default function SearchStudents() {
  const [studentDigests, setStudentDigests] = useState<Array<StudentDigest>>([])
  const getAllStudents = () => {
    axios.get('http://localhost:3000/v1/digests/student?pageIndex=1').then((res: any) => {
      console.log(res.data)
      setStudentDigests(res.data.studentDigests)
    })
  }
  useEffect(() => {
    getAllStudents()
  }, [])
  return (
    <Container>
      {/* 検索ふぉーむ */}
      <SearchForm searchType='student' />
      {/* カード一覧 */}
      <HeaderLabel>
        <h5>大学生一覧({studentDigests.length}人)</h5>
      </HeaderLabel>
      <StudentsList studentDigests={studentDigests} />
    </Container>
  )
}

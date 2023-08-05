import { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import StudentsList from '../../ui-parts/StudentsList/StudentsList'
import styled from 'styled-components'
import apiClient from '@/lib/http-common'
import { StudentDigest } from '@/values/Students'
import Log from '@/lib/logger'

const HeaderLabel = styled.div`
  margin-top: 20px;
  border-bottom: 1px solid #636363;
`

export default function SearchStudents() {
  const [studentDigests, setStudentDigests] = useState<Array<StudentDigest>>([])
  const getAllStudents = () => {
    apiClient.get('/v1/digests/student?pageIndex=1').then((res: any) => {
      Log.v(res.data)
      if (!('studentDigests' in res.data)) {
        setStudentDigests([])
        return
      }
      setStudentDigests(res.data.studentDigests)
    })
  }
  useEffect(() => {
    getAllStudents()
  }, [])
  return (
    <Container>
      {/* カード一覧 */}
      <HeaderLabel>
        <h5>大学生一覧({studentDigests.length}人)</h5>
      </HeaderLabel>
      <StudentsList studentDigests={studentDigests} />
    </Container>
  )
}

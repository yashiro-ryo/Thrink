import { Row, Col } from 'react-bootstrap'
import StudentProfileCard from './StudentProfileCard'
import styled from 'styled-components'
import { StudentDigest } from '@/values/Students'

const StyledCol = styled(Col)`
  margin-top: 20px;
`

type Props = {
  studentDigests: Array<StudentDigest>
}

export default function StudentList(props: Props) {
  return (
    <div>
      <Row>
        {props.studentDigests.map((studentDigest, index) => {
          return (
            <StyledCol key={`student-card-${index}`}>
              <StudentProfileCard studentDigest={studentDigest} />
            </StyledCol>
          )
        })}
      </Row>
    </div>
  )
}

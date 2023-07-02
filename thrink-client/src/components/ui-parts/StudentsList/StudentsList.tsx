import { Row, Col } from 'react-bootstrap'
import StudentProfileCard from './StudentProfileCard'
import styled from 'styled-components'
import { Student } from '@/values/Students'

const StyledCol = styled(Col)`
  margin-top: 20px;
`

type Props = {
  students: Array<Student>
}

export default function StudentList(props: Props) {
  return (
    <div>
      <Row>
        {props.students.map((student, index) => {
          return (
            <StyledCol key={`student-card-${index}`}>
              <StudentProfileCard student={student} />
            </StyledCol>
          )
        })}
      </Row>
    </div>
  )
}

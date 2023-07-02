import { Row, Col } from 'react-bootstrap'
import GroupProfileCard from './GroupProfileCard'
import styled from 'styled-components'
import { Group } from '@/values/Groups'

const StyledCol = styled(Col)`
  margin-top: 20px;
`

type Props = {
  groups: Array<Group>
}

export default function GroupsList(props: Props) {
  return (
    <div>
      <Row>
        {props.groups.map((group, index) => {
          return (
            <StyledCol key={`group-card-${index}`}>
              <GroupProfileCard group={group} />
            </StyledCol>
          )
        })}
      </Row>
    </div>
  )
}

import { Row, Col } from 'react-bootstrap'
import GroupProfileCard from './GroupProfileCard'
import styled from 'styled-components'
import { GroupDigest } from '@/values/Groups'

const StyledCol = styled(Col)`
  margin-top: 20px;
`

type Props = {
  groupsDigests: Array<GroupDigest>
}

export default function GroupsList(props: Props) {
  return (
    <div>
      <Row>
        {props.groupsDigests.map((groupDigest, index) => {
          return (
            <StyledCol key={`group-card-${index}`}>
              <GroupProfileCard groupDigest={groupDigest} />
            </StyledCol>
          )
        })}
      </Row>
    </div>
  )
}

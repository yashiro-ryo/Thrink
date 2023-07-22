import styled from 'styled-components'
import { Chatroom } from '@/values/Chat'
import { createChatroomLabel } from '@/lib/chatroomHelper'
const LeftPane = styled.div`
  width: 300px;
  height: calc(100vh - 56px - 50px);
  border-right: 1px solid #636363;
`
const Lists = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
`
const ListItem = styled.button`
  border: none;
  border-bottom: 1px solid #636363;
  border-right: 1px solid #636363;
  height: 60px;
  &:hover {
    background-color: #d6d6d6;
  }
`

type Props = {
  chatrooms: Array<Chatroom>
  myUid: number
}

export default function ChatPageLeftPane(props: Props) {
  const chatroomLabels = createChatroomLabel(props.chatrooms, props.myUid)
  return (
    <LeftPane>
      <Lists>
        {chatroomLabels.map((chatrromLabel, index) => {
          return (
            <ListItem key={`chatroom-label-${index}`}>
              <p>{chatrromLabel.chatroomLabel}</p>
              <span>{chatrromLabel.chatPartnerIconImgUrl}</span>
            </ListItem>
          )
        })}
      </Lists>
    </LeftPane>
  )
}

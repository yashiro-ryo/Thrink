import styled from 'styled-components'
import { ChatInfo, Chatroom } from '@/values/Chat'
import { nullCheck } from '@/lib/stringHelper'
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
  selectChatroom: (chatroomInfo: ChatInfo) => void
}

export default function ChatPageLeftPane(props: Props) {
  return (
    <LeftPane>
      <Lists>
        {props.chatrooms.map((chatroom, i) => {
          return (
            <ListItem
              key={`chatroom-label-${i}`}
              onClick={() =>
                props.selectChatroom({
                  chatroomId: chatroom.chatroomId,
                  u1Uid: chatroom.u1Uid,
                  u2Uid: chatroom.u2Uid,
                })
              }
            >
              <p>
                {chatroom.u1Uid === props.myUid ? chatroom.u2DisplayName : chatroom.u1DisplayName}
              </p>
              <span>
                {chatroom.u1Uid === props.myUid
                  ? nullCheck(chatroom.u2IconImgUrl)
                  : nullCheck(chatroom.u1IconImgUrl)}
              </span>
            </ListItem>
          )
        })}
      </Lists>
    </LeftPane>
  )
}

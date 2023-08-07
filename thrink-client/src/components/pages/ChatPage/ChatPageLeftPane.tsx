import styled from 'styled-components'
import { ChatInfo, Chatroom } from '@/values/Chat'
import { nullCheck } from '@/lib/stringHelper'

const LeftPane = styled.div`
  @media (max-width: 700px) {
    // for mobile
    width: 100%;
  }
  @media (min-width: 701px) {
    // for desktop
    max-width: 300px;
    border-right: 1px solid #636363;
  }
  height: calc(100vh - 56px);
`
const Lists = styled.div`
  width: 100%;
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
const PageName = styled.div`
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #636363;
  border-right: 1px solid #636363;
  line-height: 50px;
  padding-left: 10px;
`

type Props = {
  chatrooms: Array<Chatroom>
  myUid: number
  selectChatroom: (chatroomInfo: ChatInfo) => void
  userDevice: 'mobile' | 'desktop'
}

export default function ChatPageLeftPane(props: Props) {
  return (
    <LeftPane>
      <PageName>
        <p>メッセージ一覧</p>
      </PageName>
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
                  displayName:
                    props.myUid === chatroom.u1Uid
                      ? chatroom.u2DisplayName
                      : chatroom.u1DisplayName,
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

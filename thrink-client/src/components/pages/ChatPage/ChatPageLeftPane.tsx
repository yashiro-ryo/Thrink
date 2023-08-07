import styled from 'styled-components'
import { ChatInfo, Chatroom } from '@/values/Chat'
import { nullCheck } from '@/lib/stringHelper'
import { useAppSelector } from '@/redux/hooks'

const LeftPane = styled.div`
  @media (max-width: 700px) {
    // for mobile
    width: 100%;
  }
  @media (min-width: 701px) {
    // for desktop
    min-width: 300px;
    border-right: 1px solid #636363;
  }
  height: calc(100vh - 56px);
`
const Lists = styled.div`
  width: 100%;
  height: calc(100vh - 56px - 50px);
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  padding-top: 5px;
`
const ListItem = styled.button`
  border: none;
  height: 60px;
  border-radius: 5px;
  margin: 0 5px;
  background-color: #fff;
  &:hover {
    background-color: #dadada;
  }
  @media (max-width: 700px) {
    border-radius: 0px;
    border-bottom: 1px solid #939393;
    margin: 0;
  }
`
const SelectedListItem = styled.button`
  border: none;
  height: 60px;
  border-radius: 5px;
  margin: 0 5px;
  background-color: #dcdcdc;
  border: 1.5px solid #939393;
`
const PageName = styled.div`
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #636363;
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
  const selectedChatroomInfo = useAppSelector(
    (state) => state.selectedChatroomInfoReducer.selectedChatroomInfo,
  )
  const isSelected = (chatroomId: number): boolean => {
    if (selectedChatroomInfo === null) {
      return false
    }
    if (selectedChatroomInfo.chatroomId === chatroomId) {
      return true
    } else {
      return false
    }
  }
  return (
    <LeftPane>
      <PageName>
        <p>メッセージ一覧</p>
      </PageName>
      <Lists>
        {props.chatrooms.map((chatroom, i) => {
          return (
            <>
              {isSelected(chatroom.chatroomId) ? (
                <SelectedListItem
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
                    {chatroom.u1Uid === props.myUid
                      ? chatroom.u2DisplayName
                      : chatroom.u1DisplayName}
                  </p>
                  <span>
                    {chatroom.u1Uid === props.myUid
                      ? nullCheck(chatroom.u2IconImgUrl)
                      : nullCheck(chatroom.u1IconImgUrl)}
                  </span>
                </SelectedListItem>
              ) : (
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
                    {chatroom.u1Uid === props.myUid
                      ? chatroom.u2DisplayName
                      : chatroom.u1DisplayName}
                  </p>
                  <span>
                    {chatroom.u1Uid === props.myUid
                      ? nullCheck(chatroom.u2IconImgUrl)
                      : nullCheck(chatroom.u1IconImgUrl)}
                  </span>
                </ListItem>
              )}
            </>
          )
        })}
      </Lists>
    </LeftPane>
  )
}

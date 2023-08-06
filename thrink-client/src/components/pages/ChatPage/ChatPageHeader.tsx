import { useAppSelector } from '@/redux/hooks'
import { useEffect } from 'react'
import styled from 'styled-components'
const Header = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
`
const PageName = styled.div`
  width: 300px;
  border-bottom: 1px solid #636363;
  border-right: 1px solid #636363;
  line-height: 50px;
  padding-left: 10px;
`
const ChatRoomTitle = styled.div`
  width: calc(100% - 300px);
  border-bottom: 1px solid #636363;
  line-height: 50px;
  padding-left: 10px;
`

type Props = {
  myUid: number
}

export default function ChatPageHeader(props: Props) {
  const selectedChatroomInfo = useAppSelector(
    (state) => state.selectedChatroomInfoReducer.selectedChatroomInfo,
  )
  const ChatroomName = () => {
    // 初期値
    if (selectedChatroomInfo === null) {
      return 'チャットルーム名'
    } else {
      return selectedChatroomInfo.displayName
    }
  }
  return (
    <Header>
      <PageName>
        <p>メッセージ一覧</p>
      </PageName>
      <ChatRoomTitle>
        <p>{ChatroomName()}</p>
      </ChatRoomTitle>
    </Header>
  )
}

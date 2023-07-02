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
`
const ChatRoomTitle = styled.div`
  width: calc(100% - 300px);
  border-bottom: 1px solid #636363;
`

export default function ChatPageHeader() {
  return (
    <Header>
      <PageName>
        <p>メッセージ</p>
      </PageName>
      <ChatRoomTitle>
        <p>チャットルーム名</p>
      </ChatRoomTitle>
    </Header>
  )
}

import NavbarComp from '@/components/ui-parts/Navbar/Navbar'
import styled from 'styled-components'
import ChatPageLeftPane from './ChatPageLeftPane'
import ChatPageHeader from './ChatPageHeader'
import ChatPageTimeline from './ChatPageTimeline'
const ChatPageComp = styled.div`
  width: 100%;
  height: calc(100vh - 56px);
  background-color: #f5f5f5;
`
const ChatPageBody = styled.div`
  display: flex;
`
export default function ChatPage() {
  return (
    <div>
      <NavbarComp />
      <ChatPageComp>
        <ChatPageHeader />
        <ChatPageBody>
          <ChatPageLeftPane />
          <ChatPageTimeline />
        </ChatPageBody>
      </ChatPageComp>
    </div>
  )
}

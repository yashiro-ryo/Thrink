import NavbarComp from '@/components/ui-parts/Navbar/Navbar'
import styled from 'styled-components'
import ChatPageLeftPane from './ChatPageLeftPane'
import ChatPageHeader from './ChatPageHeader'
import ChatPageTimeline from './ChatPageTimeline'
import { Socket, io } from 'socket.io-client'
import { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
const ChatPageComp = styled.div`
  width: 100%;
  height: calc(100vh - 56px);
  background-color: #f5f5f5;
`
const ChatPageBody = styled.div`
  display: flex;
`
export default function ChatPage() {
  const [socket, setSocket] = useState<Socket>()
  const connectToServer = () => {
    const socketInstance = io('http://localhost:3000')
    socketInstance.on('connect', () => console.log('connect'))
    setSocket(socketInstance)
  }
  const sendMessage = () => {
    if (socket !== undefined) {
      console.log('send message')
      socket.emit('receive-message', 'message test')
    }
  }
  useEffect(() => {
    connectToServer()
  }, [])
  return (
    <div>
      <NavbarComp />
      <ChatPageComp>
        <ChatPageHeader />
        <ChatPageBody>
          <ChatPageLeftPane />
          <ChatPageTimeline />
          <Button variant='primary' onClick={() => sendMessage()}>
            sokcetテスト
          </Button>
        </ChatPageBody>
      </ChatPageComp>
    </div>
  )
}

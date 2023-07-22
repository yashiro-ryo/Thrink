import NavbarComp from '@/components/ui-parts/Navbar/Navbar'
import styled from 'styled-components'
import ChatPageLeftPane from './ChatPageLeftPane'
import ChatPageHeader from './ChatPageHeader'
import ChatPageTimeline from './ChatPageTimeline'
import { Socket, io } from 'socket.io-client'
import { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useAppSelector } from '@/redux/hooks'
import { Chatroom } from '@/values/Chat'
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
  const [chatrooms, setChatrooms] = useState<Array<Chatroom>>([])
  const userProfileMeta = useAppSelector((state) => state.userProfileMetaReducer.profileMeta)
  const connectToServer = () => {
    const socketInstance = io('http://localhost:3000')
    socketInstance
      .on('connect', () => {
        // サーバーに接続成功時のイベント
        if (userProfileMeta === null) {
          return
        }
        // 個別の接続を作るようにイベントを発火する
        socketInstance.emit('join', { msg: { uid: userProfileMeta.uid } })
      })
      .on('success-join', () => {
        // サーバーとの個別接続が確立したのを検知するイベント
        console.log('success join room')
        if (userProfileMeta === null) {
          return
        }
        // chatroomの一覧を取得する
        socketInstance.emit('get-chatrooms', { msg: { uid: userProfileMeta.uid } })
      })
      .on('update-chatrooms', (data) => {
        // サーバーから取得したchatroomsの取得を検知するイベント
        console.log('update-chatrooms')
        console.log(data)
        setChatrooms(data.chatrooms)
      })
      .on('update-chat', (data) => {
        // サーバーから取得したchatの内容の取得を検知するイベント
        console.log('update-chat')
        console.log(data)
      })
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
          <ChatPageLeftPane
            chatrooms={chatrooms}
            myUid={userProfileMeta === null ? 0 : userProfileMeta.uid}
          />
          <ChatPageTimeline />
          <Button variant='primary' onClick={() => sendMessage()}>
            sokcetテスト
          </Button>
        </ChatPageBody>
      </ChatPageComp>
    </div>
  )
}

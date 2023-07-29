import NavbarComp from '@/components/ui-parts/Navbar/Navbar'
import styled from 'styled-components'
import ChatPageLeftPane from './ChatPageLeftPane'
import ChatPageHeader from './ChatPageHeader'
import ChatPageTimeline from './ChatPageTimeline'
import { Socket, io } from 'socket.io-client'
import { useEffect, useState } from 'react'
import { useAppSelector } from '@/redux/hooks'
import { Chatroom, Chat, ChatInfo } from '@/values/Chat'
import { useRouter } from 'next/navigation'
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
  const [chat, setChat] = useState<Array<Chat>>([])
  const [selectedChatroomInfo, setSelectedChatroomInfo] = useState<ChatInfo>({
    chatroomId: 0,
    u1Uid: 0,
    u2Uid: 0,
  })
  const userProfileMeta = useAppSelector((state) => state.userProfileMetaReducer.profileMeta)
  const router = useRouter()
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
        setChat(data.chat)
      })
    setSocket(socketInstance)
  }
  const sendMessage = (
    chatroomId: number,
    u1Uid: number,
    u2Uid: number,
    messageBody: string,
    messageType: string,
  ) => {
    if (socket === undefined || userProfileMeta === null) {
      return
    }
    if (messageBody.length === 0 || messageType.length === 0) {
      return
    }
    console.log(`send messaage msgBody: ${messageBody}, msgType: ${messageType}`)
    if (userProfileMeta.uid === u1Uid) {
      socket.emit('send-message', {
        uid: userProfileMeta.uid,
        chatroomId,
        senderUid: u1Uid,
        receiverUid: u2Uid,
        contentBody: messageBody,
        contentType: messageType,
      })
    } else {
      socket.emit('send-message', {
        uid: userProfileMeta.uid,
        chatroomId,
        senderUid: u2Uid,
        receiverUid: u1Uid,
        contentBody: messageBody,
        contentType: messageType,
      })
    }
  }
  const selectChatroom = (selectedChatroomInfo: ChatInfo) => {
    console.log(`get chat chatroomId: ${selectedChatroomInfo.chatroomId}`)
    if (socket === undefined || userProfileMeta === null) {
      return
    }
    setSelectedChatroomInfo(selectedChatroomInfo)
    console.log('get chat')
    socket.emit('get-chat', {
      uid: userProfileMeta.uid,
      chatroomId: selectedChatroomInfo.chatroomId,
    })
  }
  useEffect(() => {
    connectToServer()
  }, [])
  useEffect(() => {
    console.log(userProfileMeta)
    if (userProfileMeta === null) {
      router.push(`/signin?redirect=chat`)
    }
  }, [userProfileMeta])
  return (
    <div>
      <NavbarComp />
      <ChatPageComp>
        <ChatPageHeader />
        <ChatPageBody>
          <ChatPageLeftPane
            chatrooms={chatrooms}
            myUid={userProfileMeta === null ? 0 : userProfileMeta.uid}
            selectChatroom={selectChatroom}
          />
          <ChatPageTimeline
            selectedChatroomInfo={selectedChatroomInfo}
            chat={chat}
            myUid={userProfileMeta ? userProfileMeta?.uid : 0}
            sendMessage={sendMessage}
          />
        </ChatPageBody>
      </ChatPageComp>
    </div>
  )
}

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
import ChatLoadingPage from './ChatLoadingPage'
import Log from '@/lib/logger'
import { checkUserSession } from '@/lib/auth'
import { useDispatch } from 'react-redux'
import { signin } from '@/redux/slices/signedinStateSlice'
import { saveUserProfileMeta } from '@/redux/slices/userProfileMetaSlice'
import { setSelectedChatroomInfo } from '@/redux/slices/selectedChatroomInfoSlice'
import { UserProfileMetaWithoutSecureData } from '@/values/UserProfileMeta'

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
  const [isLoading, setLoading] = useState(true)
  const userProfileMeta = useAppSelector((state) => state.userProfileMetaReducer.profileMeta)
  const selectedChatroomInfo = useAppSelector(
    (state) => state.selectedChatroomInfoReducer.selectedChatroomInfo,
  )
  const router = useRouter()
  const dispatch = useDispatch()
  const connectToServer = () => {
    // TODO 設定別モジュール化
    const serverURL =
      process.env.NEXT_PUBLIC_APP_MODE === 'dev'
        ? 'http://localhost:3000'
        : 'https://api.thrink.net'
    const socketInstance = io(serverURL)
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
        Log.v('success join room')
        if (userProfileMeta === null) {
          return
        }
        // chatroomの一覧を取得する
        socketInstance.emit('get-chatrooms', { msg: { uid: userProfileMeta.uid } })
      })
      .on('update-chatrooms', (data) => {
        // サーバーから取得したchatroomsの取得を検知するイベント
        Log.v('update-chatrooms')
        Log.v(data)
        setChatrooms(data.chatrooms)
        setLoading(false)
      })
      .on('update-chat', (data) => {
        // サーバーから取得したchatの内容の取得を検知するイベント
        Log.v('update-chat')
        Log.v(data)
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
    Log.v(`send messaage msgBody: ${messageBody}, msgType: ${messageType}`)
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
  const selectChatroom = (chatroomInfo: ChatInfo) => {
    Log.v(`get chat chatroomId: ${chatroomInfo.chatroomId}`)
    if (socket === undefined || userProfileMeta === null) {
      return
    }
    if (
      selectedChatroomInfo !== null &&
      selectedChatroomInfo.chatroomId === chatroomInfo.chatroomId
    ) {
      dispatch(setSelectedChatroomInfo(null))
      return
    }
    dispatch(setSelectedChatroomInfo(chatroomInfo))
    Log.v('get chat')
    socket.emit('get-chat', {
      uid: userProfileMeta.uid,
      chatroomId: chatroomInfo.chatroomId,
    })
  }
  useEffect(() => {
    Log.v(userProfileMeta)
    const onSuccessCheckSession = (userProfileMeta: UserProfileMetaWithoutSecureData) => {
      dispatch(signin())
      dispatch(saveUserProfileMeta(userProfileMeta))
      connectToServer()
    }
    const onErrorCheckSession = () => {
      router.push(`/signin?redirect=chat`)
    }
    if (userProfileMeta !== null) {
      connectToServer()
      return
    }
    checkUserSession(onSuccessCheckSession, onErrorCheckSession)
  }, [userProfileMeta]) // eslint-disable-line
  return (
    <div>
      <NavbarComp />
      {isLoading ? (
        <ChatLoadingPage />
      ) : (
        <ChatPageComp>
          <ChatPageHeader myUid={userProfileMeta === null ? 0 : userProfileMeta.uid} />
          <ChatPageBody>
            <ChatPageLeftPane
              chatrooms={chatrooms}
              myUid={userProfileMeta === null ? 0 : userProfileMeta.uid}
              selectChatroom={selectChatroom}
            />
            <ChatPageTimeline
              chat={chat}
              myUid={userProfileMeta ? userProfileMeta?.uid : 0}
              sendMessage={sendMessage}
            />
          </ChatPageBody>
        </ChatPageComp>
      )}
    </div>
  )
}

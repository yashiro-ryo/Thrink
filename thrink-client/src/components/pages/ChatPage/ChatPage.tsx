import NavbarComp from '@/components/ui-parts/Navbar/Navbar'
import styled from 'styled-components'
import ChatPageLeftPane from './ChatPageLeftPane'
import ChatPageHeader from './ChatPageHeader'
import ChatPageTimeline from './ChatPageTimeline'
import { Socket, io } from 'socket.io-client'
import { useEffect, useState } from 'react'
import { useAppSelector } from '@/redux/hooks'
import { Chatroom, Chat, ChatInfo } from '@/values/Chat'
import { useRouter, useSearchParams } from 'next/navigation'
import ChatLoadingPage from './ChatLoadingPage'
import Log from '@/lib/logger'
import { checkUserSession } from '@/lib/auth'
import { useDispatch } from 'react-redux'
import { signin } from '@/redux/slices/signedinStateSlice'
import { saveUserProfileMeta } from '@/redux/slices/userProfileMetaSlice'
import { setSelectedChatroomInfo } from '@/redux/slices/selectedChatroomInfoSlice'
import { UserProfileMetaWithoutSecureData } from '@/values/UserProfileMeta'
import { API_SERVER_URL } from '@/lib/api-server-url'

const ChatPageComp = styled.div`
  width: 100%;
  height: calc(100vh - 56px);
  background-color: #f5f5f5;
`
const ChatPageBody = styled.div`
  display: flex;
`
export default function ChatPage() {
  // state
  const [chatrooms, setChatrooms] = useState<Array<Chatroom>>([])
  const [chat, setChat] = useState<Array<Chat>>([])
  const [isLoading, setLoading] = useState(true)
  const [socket, setSocket] = useState<Socket | null>(null)
  // URL
  const router = useRouter()
  const searchParams = useSearchParams()
  // Redux
  const userProfileMeta = useAppSelector((state) => state.userProfileMetaReducer.profileMeta)
  const selectedChatroomInfo = useAppSelector(
    (state) => state.selectedChatroomInfoReducer.selectedChatroomInfo,
  )
  const dispatch = useDispatch()

  const sendMessage = (
    chatroomId: number,
    u1Uid: number,
    u2Uid: number,
    messageBody: string,
    messageType: string,
  ) => {
    if (socket === null || userProfileMeta === null) {
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
    console.log(`socketInstance ${socket}`)
    if (socket === null || userProfileMeta === null) {
      return
    }
    if (
      selectedChatroomInfo !== null &&
      selectedChatroomInfo.chatroomId === chatroomInfo.chatroomId
    ) {
      dispatch(setSelectedChatroomInfo(null))
      setChat([])
      router.push('/chat')
      return
    }
    dispatch(setSelectedChatroomInfo(chatroomInfo))
    Log.v('get chat')
    socket.emit('get-chat', {
      uid: userProfileMeta.uid,
      chatroomId: chatroomInfo.chatroomId,
    })
    router.push(`/chat?cid=${chatroomInfo.chatroomId}`)
  }

  const setupChatPage = (userProfileMeta: UserProfileMetaWithoutSecureData) => {
    const chatroomId = searchParams.get('cid')
    const socketInstance = io(API_SERVER_URL)
    setSocket(socketInstance)
    // setup socket event handler
    // FIXME イベントが複数回呼ばれる不具合の修正(特にupdate-chatrooms)
    socketInstance
      .on('connect', () => {
        // サーバーに接続成功時のイベント
        console.log('connected')
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

    if (chatroomId === null) {
      // chatroomId未指定の場合はconnectのみ
      return
    }
    socketInstance.emit('get-chat', {
      uid: userProfileMeta.uid,
      chatroomId: chatroomId,
    })
  }

  let hasSetupPrepared = false

  useEffect(() => {
    const onSuccessCheckSession = (userProfileMeta: UserProfileMetaWithoutSecureData) => {
      dispatch(signin())
      dispatch(saveUserProfileMeta(userProfileMeta))
      setupChatPage(userProfileMeta)
    }
    const onErrorCheckSession = () => {
      router.push(`/signin?redirect=chat`)
    }
    if (userProfileMeta !== null && !hasSetupPrepared) {
      console.log(hasSetupPrepared)
      setupChatPage(userProfileMeta)
      hasSetupPrepared = true
      return
    }
    checkUserSession(onSuccessCheckSession, onErrorCheckSession)
    return () => {
      if (socket !== null) {
        socket.removeAllListeners()
        socket.disconnect()
      }
    }
  }, [userProfileMeta]) // eslint-disable-line

  useEffect(() => {
    // any滅ぼす
    const onResize = (e: any) => {
      console.log('on resize')
      console.log(`width: ${window.innerWidth}, height: ${window.innerHeight}`)
      if (window.innerWidth <= 700) {
        console.log('mobile mode')
      } else {
        console.log('desktop mode')
      }
    }
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [])
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

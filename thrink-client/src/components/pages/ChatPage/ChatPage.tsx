import NavbarComp from '@/components/ui-parts/Navbar/Navbar'
import styled from 'styled-components'
import ChatPageLeftPane from './ChatPageLeftPane'
import ChatPageTimeline from './ChatPageTimeline'
import { Socket, io } from 'socket.io-client'
import { useEffect, useState } from 'react'
import { useAppSelector } from '@/redux/hooks'
import { Chatroom, Chat, ChatInfo } from '@/values/Chat'
import { useRouter, useSearchParams } from 'next/navigation'
import ChatLoadingPage from './ChatLoadingPage'
import { checkUserSession } from '@/lib/auth'
import { useDispatch } from 'react-redux'
import { signin } from '@/redux/slices/signedinStateSlice'
import { saveUserProfileMeta } from '@/redux/slices/userProfileMetaSlice'
import { setSelectedChatroomInfo } from '@/redux/slices/selectedChatroomInfoSlice'
import { UserProfileMetaWithoutSecureData } from '@/values/UserProfileMeta'
import { API_SERVER_URL } from '@/lib/api-server-url'
import { checkUserDevice } from './userDevice'

const ChatPageComp = styled.div`
  width: 100%;
  height: calc(100vh - 56px);
`
const ChatPageBody = styled.div`
  @media (max-width: 700px) {
    display: block;
  }
  @media (min-width: 701px) {
    display: flex;
  }
`
export default function ChatPage() {
  // state
  const [chatrooms, setChatrooms] = useState<Array<Chatroom>>([])
  const [chat, setChat] = useState<Array<Chat>>([])
  const [isLoading, setLoading] = useState(true)
  const [socket, setSocket] = useState<Socket | null>(null)
  const [userDevice, setUserDevice] = useState<'mobile' | 'desktop'>('desktop')
  const [leftPaneVisible, setLeftPaneVisible] = useState(true)
  const [timelineVisible, setTimelineVisible] = useState(true)
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

    socket.emit('send-message', {
      uid: userProfileMeta.uid,
      chatroomId,
      senderUid: userProfileMeta.uid === u1Uid ? u1Uid : u2Uid,
      receiverUid: userProfileMeta.uid === u1Uid ? u2Uid : u1Uid,
      contentBody: messageBody,
      contentType: messageType,
    })
  }
  const selectChatroom = (chatroomInfo: ChatInfo) => {
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
    socket.emit('get-chat', {
      uid: userProfileMeta.uid,
      chatroomId: chatroomInfo.chatroomId,
    })
    router.push(`/chat?cid=${chatroomInfo.chatroomId}`)
    if (userDevice === 'mobile') {
      setLeftPaneVisible(false)
      setTimelineVisible(true)
    }
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
        if (userProfileMeta === null) {
          return
        }
        // 個別の接続を作るようにイベントを発火する
        socketInstance.emit('join', { msg: { uid: userProfileMeta.uid } })
      })
      .on('success-join', () => {
        // サーバーとの個別接続が確立したのを検知するイベント
        if (userProfileMeta === null) {
          return
        }
        // chatroomの一覧を取得する
        socketInstance.emit('get-chatrooms', { msg: { uid: userProfileMeta.uid } })
      })
      .on('update-chatrooms', (data) => {
        // サーバーから取得したchatroomsの取得を検知するイベント
        setChatrooms(data.chatrooms)
        setLoading(false)
      })
      .on('update-chat', (data) => {
        // サーバーから取得したchatの内容の取得を検知するイベント
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
    if (userDevice === 'mobile') {
      setLeftPaneVisible(false)
      setTimelineVisible(true)
    }
  }

  useEffect(() => {
    const onSuccessCheckSession = (userProfileMeta: UserProfileMetaWithoutSecureData | null) => {
      if (userProfileMeta === null) {
        router.push(`/signin?redirect=chat`)
        return
      }
      dispatch(signin())
      dispatch(saveUserProfileMeta(userProfileMeta))
      setupChatPage(userProfileMeta)
    }
    if (userProfileMeta !== null) {
      setupChatPage(userProfileMeta)
      return
    }
    checkUserSession(onSuccessCheckSession)
    return () => {
      if (socket !== null) {
        socket.removeAllListeners()
        socket.disconnect()
      }
    }
  }, [userProfileMeta]) // eslint-disable-line

  useEffect(() => {
    const showMobilePage = () => {
      setUserDevice('mobile')
      setLeftPaneVisible(true)
      setTimelineVisible(false)
    }
    const showDesktopPage = () => {
      setUserDevice('desktop')
      setLeftPaneVisible(true)
      setTimelineVisible(true)
    }
    // any滅ぼす
    const onResize = (e: any) => {
      checkUserDevice(showMobilePage, showDesktopPage)
    }
    checkUserDevice(showMobilePage, showDesktopPage)
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
          <ChatPageBody>
            {leftPaneVisible ? (
              <ChatPageLeftPane
                chatrooms={chatrooms}
                myUid={userProfileMeta === null ? 0 : userProfileMeta.uid}
                selectChatroom={selectChatroom}
                userDevice={userDevice}
              />
            ) : (
              ''
            )}
            {timelineVisible ? (
              <ChatPageTimeline
                chat={chat}
                myUid={userProfileMeta ? userProfileMeta?.uid : 0}
                sendMessage={sendMessage}
                userDevice={userDevice}
                hideTimeline={() => {
                  setTimelineVisible(false)
                  setLeftPaneVisible(true)
                  dispatch(setSelectedChatroomInfo(null))
                  setChat([])
                  router.push('/chat')
                }}
              />
            ) : (
              ''
            )}
          </ChatPageBody>
        </ChatPageComp>
      )}
    </div>
  )
}

import { useState, useRef, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import styled from 'styled-components'
import TimelineBody from './TimelineBody'
import { Chat } from '@/values/Chat'
import { useAppSelector } from '@/redux/hooks'

const Timeline = styled.div`
  width: 100%;
  height: calc(100vh - 56px);
`
const TimelineFooter = styled.div`
  height: 80px;
  border-top: 1px solid #636363;
  padding: 10px;
  display: flex;
`
const SendBtn = styled(Button)`
  width: 90px;
  margin-left: 10px;
`
const TimelineHeader = styled.div`
  width: 100%;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #636363;
  padding-left: 10px;
  display: flex;
  > button {
    width: 35px;
    height: 35px;
    margin: auto 0;
  }
  > p {
    margin-left: 10px;
  }
`

type Props = {
  chat: Array<Chat>
  myUid: number
  sendMessage: (
    chatroomId: number,
    u1Uid: number,
    u2Uid: number,
    messageBody: string,
    messageType: string,
  ) => void
  userDevice: 'mobile' | 'desktop'
  hideTimeline: () => void
}

export default function ChatPageTimeline(props: Props) {
  const [inputText, setInputText] = useState<string>('')
  const scrollContainer = useRef<HTMLDivElement>(null)
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
  useEffect(() => {
    if (scrollContainer === null) {
      return
    }
    const scrollHeight = scrollContainer.current?.scrollHeight
    if (props.chat.length > 0) {
      scrollContainer.current?.scrollTo({
        top: scrollHeight,
      })
    }
  }, [props.chat])
  return (
    <Timeline>
      <TimelineHeader>
        {props.userDevice === 'mobile' ? (
          <Button variant='white' onClick={() => props.hideTimeline()}>
            &lt;
          </Button>
        ) : (
          ''
        )}
        <p>{ChatroomName()}</p>
      </TimelineHeader>
      <TimelineBody chat={props.chat} myUid={props.myUid} scrollContainer={scrollContainer} />
      <TimelineFooter>
        <Form.Control
          type='text'
          value={inputText}
          placeholder='メッセージを入力'
          onChange={(e: any) => {
            setInputText(e.target.value)
          }}
        />
        <SendBtn
          variant='primary'
          onClick={() => {
            if (selectedChatroomInfo === null) {
              // chatroomが選択されていない
              return
            }
            props.sendMessage(
              selectedChatroomInfo.chatroomId,
              selectedChatroomInfo.u1Uid,
              selectedChatroomInfo.u2Uid,
              inputText,
              'message',
            )
            setInputText('')
          }}
        >
          送信
        </SendBtn>
      </TimelineFooter>
    </Timeline>
  )
}

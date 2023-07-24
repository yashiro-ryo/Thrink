import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import styled from 'styled-components'
import TimelineBody from './TimelineBody'
import { Chat, ChatInfo } from '@/values/Chat'

const Timeline = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const StyledTimelineBody = styled(TimelineBody)`
  height: calc(100vh - 80px - 56px - 50px);
  overflow-y: scroll;
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
  selectedChatroomInfo: ChatInfo
}

export default function ChatPageTimeline(props: Props) {
  const [inputText, setInputText] = useState<string>('')
  return (
    <Timeline>
      <StyledTimelineBody chat={props.chat} myUid={props.myUid} />
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
            props.sendMessage(
              props.selectedChatroomInfo.chatroomId,
              props.selectedChatroomInfo.u1Uid,
              props.selectedChatroomInfo.u2Uid,
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

import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import styled from 'styled-components'
import TimelineBody from './TimelineBody'
import { Chat } from '@/values/Chat'
import { useAppSelector } from '@/redux/hooks'

const Timeline = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
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
}

export default function ChatPageTimeline(props: Props) {
  const [inputText, setInputText] = useState<string>('')
  const selectedChatroomInfo = useAppSelector(
    (state) => state.selectedChatroomInfoReducer.selectedChatroomInfo,
  )
  return (
    <Timeline>
      <TimelineBody chat={props.chat} myUid={props.myUid} />
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

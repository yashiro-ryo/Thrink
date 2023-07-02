import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import styled from 'styled-components'

const Timeline = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const TimelineBody = styled.div`
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

export default function ChatPageTimeline() {
  const [inputText, setInputText] = useState<string>('')
  return (
    <Timeline>
      <TimelineBody></TimelineBody>
      <TimelineFooter>
        <Form.Control
          type='text'
          value={inputText}
          placeholder='メッセージを入力'
          onChange={(e: any) => {
            setInputText(e.target.value)
          }}
        />
        <SendBtn variant='primary'>送信</SendBtn>
      </TimelineFooter>
    </Timeline>
  )
}

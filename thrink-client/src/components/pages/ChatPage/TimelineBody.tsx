import { Chat } from '@/values/Chat'
import { RefObject } from 'react'
import styled from 'styled-components'
const StyledTimelineBody = styled.div`
  width: 100%;
  height: calc(100vh - 80px - 56px - 50px);
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
`
const StyledYourMsg = styled.div`
  width: 100%;
`
const StyledMyMsg = styled.div`
  width: 100%;
`
const MyMsgWrapper = styled.div`
  width: fit-content;
  background-color: #00f7ff;
  float: right;
  padding: 10px;
  margin: 0 10px 10px 0;
  border-radius: 10px;
  > p {
    margin: 0;
  }
`
const YourMsgWrapper = styled.div`
  background-color: #eeeeee;
  width: fit-content;
  float: left;
  padding: 10px;
  margin: 0 0 10px 10px;
  border-radius: 10px;
  > p {
    margin: 0;
  }
`

type Props = {
  chat: Array<Chat>
  myUid: number
  scrollContainer: RefObject<HTMLDivElement>
}
const MsgWrapper = (contentBody: string, contentType: string) => {
  return (
    <>{contentType === 'job-apply' ? jobApplyText(contentBody) : defaultMsgText(contentBody)}</>
  )
}

const defaultMsgText = (text: string) => {
  return <p>{text}</p>
}

const jobApplyText = (content: string) => {
  return (
    <div>
      <p>求人ID: {content}の求人に応募しました！</p>
    </div>
  )
}

export default function TimelineBody(props: Props) {
  return (
    <StyledTimelineBody ref={props.scrollContainer}>
      {props.chat.map((c, i) => {
        if (c.senderUid === props.myUid) {
          return (
            <StyledMyMsg key={`chat-message-${c.chatroomId}-${i}`}>
              <MyMsgWrapper>{MsgWrapper(c.contentBody, c.contentType)}</MyMsgWrapper>
            </StyledMyMsg>
          )
        } else {
          return (
            <StyledYourMsg key={`chat-message-${c.chatroomId}-${i}`}>
              <YourMsgWrapper>{MsgWrapper(c.contentBody, c.contentType)}</YourMsgWrapper>
            </StyledYourMsg>
          )
        }
      })}
    </StyledTimelineBody>
  )
}

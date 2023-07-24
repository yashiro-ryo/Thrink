import { Chat } from '@/values/Chat'
import styled from 'styled-components'
const StyledTimelineBody = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`
const StyledYourMsg = styled.div`
  text-align: left;
`
const StyledMyMsg = styled.div`
  text-align: right;
`

type Props = {
  chat: Array<Chat>
  myUid: number
}

export default function TimelineBody(props: Props) {
  return (
    <StyledTimelineBody>
      {props.chat.map((c, i) => {
        console.log(c)
        if (c.senderUid === props.myUid) {
          return (
            <StyledMyMsg key={`chat-message-${c.chatroomId}-${i}`}>{c.contentBody}</StyledMyMsg>
          )
        } else {
          return (
            <StyledYourMsg key={`chat-message-${c.chatroomId}-${i}`}>{c.contentBody}</StyledYourMsg>
          )
        }
      })}
    </StyledTimelineBody>
  )
}

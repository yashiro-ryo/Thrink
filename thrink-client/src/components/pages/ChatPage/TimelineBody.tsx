import { Chat } from '@/values/Chat'
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
  background-color: #ffffff;
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
}

export default function TimelineBody(props: Props) {
  return (
    <StyledTimelineBody>
      {props.chat.map((c, i) => {
        if (c.senderUid === props.myUid) {
          return (
            <StyledMyMsg key={`chat-message-${c.chatroomId}-${i}`}>
              <MyMsgWrapper>
                <p>{c.contentBody}</p>
              </MyMsgWrapper>
            </StyledMyMsg>
          )
        } else {
          return (
            <StyledYourMsg key={`chat-message-${c.chatroomId}-${i}`}>
              <YourMsgWrapper>
                <p>{c.contentBody}</p>
              </YourMsgWrapper>
            </StyledYourMsg>
          )
        }
      })}
    </StyledTimelineBody>
  )
}

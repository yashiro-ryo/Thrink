import { nullCheck } from './stringHelper'
import { Chatroom } from '@/values/Chat'

/**
 * chatroom一覧のラベルをいい感じに出力する関数
 * @param chatrooms
 * @param myUid
 */
export const createChatroomLabel = (chatrooms: Array<Chatroom>, myUid: number) => {
  return chatrooms.map((chatroom) => {
    return {
      chatroomLabel: myUid === chatroom.u1Uid ? chatroom.u2DisplayName : chatroom.u1DisplayName,
      // icon img urlはnullの可能性あり
      chatPartnerIconImgUrl: nullCheck(
        myUid === chatroom.u1Uid ? chatroom.u2IconImgUrl : chatroom.u1IconImgUrl,
      ),
    }
  })
}

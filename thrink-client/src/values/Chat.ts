export type Chatroom = {
  chatroomId: number
  u1Uid: number
  u1DisplayName: string
  u1IconImgUrl: string
  u2Uid: number
  u2DisplayName: string
  u2IconImgUrl: string
}

export type Chat = {
  chatroomId: number
  senderUid: number
  senderDisplayName: string
  receiverUid: number
  receiverDisplayName: string
  contentBody: string
  contentType: string
  sentAt: string
  isDeleted: boolean
}

export type ChatInfo = {
  chatroomId: number
  u1Uid: number
  u2Uid: number
  displayName: string
}

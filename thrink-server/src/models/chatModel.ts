import db from "./database";

type ChatDB = {
  chatMessageId: number;
  chatroomId: number;
  senderUid: number;
  senderDisplayName: string;
  receiverUid: number;
  receiverDisplayName: string;
  contentType: string;
  contentBody: string;
  sentAt: string;
  isDeleted: 0 | 1;
};

type Chat = {
  chatMessageId: number;
  chatroomId: number;
  senderUid: number;
  senderDisplayName: string;
  receiverUid: number;
  receiverDisplayName: string;
  contentType: string;
  contentBody: string;
  sentAt: string;
  isDeleted: boolean;
};

export class ChatModel {
  constructor() {}

  async getChat(chatroomId: number) {
    return await db.query(
      `select c.chat_message_id as chatMessageId, c.chatroom_id as chatroomId, c.sender_uid as senderUid, u1.display_name as senderDisplayName, c.receiver_uid as receiverUid, u2.display_name as receiverDisplayName, c.content_body as contentBody, c.content_type as contentType, c.sent_at as sentAt, c.is_deleted as isDeleted from chat as c inner join user_profile_meta as u1 on c.sender_uid = u1.uid inner join user_profile_meta as u2 on c.receiver_uid = u2.uid where c.chatroom_id = ${chatroomId};`
    );
  }

  async insertChatMessage(
    chatroomId: number,
    senderUid: number,
    receiverUid: number,
    contentBody: string,
    contentType: string
  ) {
    await db.query(
      `insert into chat (chatroom_id, sender_uid, receiver_uid, content_body, content_type, sent_at, is_deleted) values (${chatroomId}, ${senderUid}, ${receiverUid}, '${contentBody}', '${contentType}', '2023/02/11 23:00:00', 0)`
    );
  }

  migrateTinyintToBoolean(chat: Array<ChatDB>): Array<Chat> {
    return chat.map((c) => {
      return {
        chatMessageId: c.chatMessageId,
        chatroomId: c.chatroomId,
        senderUid: c.senderUid,
        senderDisplayName: c.senderDisplayName,
        receiverUid: c.receiverUid,
        receiverDisplayName: c.receiverDisplayName,
        contentType: c.contentType,
        contentBody: c.contentBody,
        sentAt: c.sentAt,
        isDeleted: c.isDeleted === 0 ? false : true,
      };
    });
  }
}

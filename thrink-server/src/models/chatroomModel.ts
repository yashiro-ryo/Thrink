import db from "./database";

type ChatroomDB = {
  chatroom_id: number;
  u1_uid: number;
  u1_display_name: string;
  u1_icon_img_url: string;
  u2_uid: number;
  u2_display_name: string;
  u2_icon_img_url: string;
};

type Chatroom = {
  chatroomId: number;
  u1Uid: number;
  u1DisplayName: string;
  u1IconImgUrl: string;
  u2Uid: number;
  u2DisplayName: string;
  u2IconImgUrl: string;
};

export class ChatroomModel {
  constructor() {}

  // uidからchatroomの一覧を取得する関数
  async getChatrooms(uid: number) {
    return await db.query(
      `select c.chatroom_id, u1.uid as u1_uid, u1.display_name as u1_display_name, u1.icon_img_url as u1_icon_img_url, u2.uid as u2_uid, u2.display_name as u2_display_name, u2.icon_img_url as u2_icon_img_url from chatroom as c inner join user_profile_meta as u1 on c.user1_uid = u1.uid inner join user_profile_meta as u2 on c.user2_uid = u2.uid where c.user1_uid = ${uid} or c.user2_uid = ${uid};`
    );
  }

  migrateChatroomsParamSnakeCaseToCamelCase(
    chatrooms: Array<ChatroomDB>
  ): Array<Chatroom> {
    return chatrooms.map((chatroom) => {
      return {
        chatroomId: chatroom.chatroom_id,
        u1Uid: chatroom.u1_uid,
        u1DisplayName: chatroom.u1_display_name,
        u1IconImgUrl: chatroom.u1_icon_img_url,
        u2Uid: chatroom.u2_uid,
        u2DisplayName: chatroom.u2_display_name,
        u2IconImgUrl: chatroom.u2_icon_img_url,
      };
    });
  }
}

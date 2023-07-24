import { Server, Socket } from "socket.io";
import { ChatroomModel } from "../models/chatroomModel";
import { ChatModel } from "../models/chatModel";

const chatroomModel = new ChatroomModel();
const chatModel = new ChatModel();

export const setupChatSocketRouter = (io: Server) => {
  io.on("connect", (socket: Socket) => {
    console.log("connect");
    // join room
    socket.on("join", (data) => {
      console.log("join room");
      console.log(data.msg.uid);
      socket.join(data.msg.uid);
      io.to(data.msg.uid).emit("success-join");
    });

    socket.on("get-chatrooms", (data) => {
      console.log("get chatrooms");
      console.log(data.msg.uid);
      // dbから取得する
      chatroomModel.getChatrooms(data.msg.uid).then((chatrooms) => {
        io.to(data.msg.uid).emit("update-chatrooms", {
          chatrooms:
            chatroomModel.migrateChatroomsParamSnakeCaseToCamelCase(chatrooms),
        });
      });
    });

    socket.on("get-chat", (data) => {
      console.log("get chat");
      chatModel.getChat(data.chatroomId).then((chat) => {
        io.to(data.uid).emit("update-chat", {
          chat: chatModel.migrateTinyintToBoolean(chat),
        });
      });
    });

    socket.on("send-message", async (data) => {
      console.log(data);
      await chatModel.insertChatMessage(
        data.chatroomId,
        data.senderUid,
        data.receiverUid,
        data.contentBody,
        data.contentType
      );
      await chatModel.getChat(data.chatroomId).then((chat) => {
        io.to(data.receiverUid)
          .to(data.senderUid)
          .emit("update-chat", {
            chat: chatModel.migrateTinyintToBoolean(chat),
          });
      });
    });
  });
};

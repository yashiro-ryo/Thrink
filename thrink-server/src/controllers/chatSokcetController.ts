import { Server, Socket } from "socket.io";
import { ChatroomModel } from "../models/chatroomModel";

const chatroomModel = new ChatroomModel();

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
  });
};

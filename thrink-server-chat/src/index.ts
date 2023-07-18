import http from "http";
const server: http.Server = http.createServer();
import { Server, Socket } from "socket.io";
const io = new Server(server);
const PORT = 3030;
server.listen(PORT, () => console.log("app listening on port " + PORT));

io.on("connection", (socket: Socket) => {
  console.log("connection");
  console.log(socket);
});

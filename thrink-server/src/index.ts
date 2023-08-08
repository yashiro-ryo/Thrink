import express, { Application, Request, Response } from "express";
import { studentsRouter } from "./controllers/studentsController";
import { groupsRouter } from "./controllers/groupsController";
import { userAuthRouter } from "./controllers/userAuthController";
import { stduentsDigestRouter } from "./controllers/studentsDigestController";
import { groupDigestsRouter } from "./controllers/groupsDigestsController";
import { applyJobRouter } from "./controllers/applyJobController";
import cors from "cors";
import morgan from "morgan";
import session from "express-session";
import { jobRouter } from "./controllers/jobController";
import http from "http";
import { Server, Socket } from "socket.io";
import { setupChatSocketRouter } from "./controllers/chatSokcetController";
import * as bodyParser from "body-parser";
import { chatRouter } from "./controllers/chatController";

require("dotenv").config();
console.log(`APP MODE : ${process.env.APP_MODE}`);

const app: Application = express();
const PORT = 3000;
// TODO Security Settings
const SESSION_CONFIG = {
  secret: "secret",
  cookie: {},
};
declare module "express-session" {
  interface SessionData {
    uid: number;
  }
}

app.use(morgan("dev"));
// TODO Security Settings
app.use(cors({ credentials: true, origin: true }));
app.use(session(SESSION_CONFIG));
app.use(bodyParser.json({ limit: "50mb" })); // jsonをパースする際のlimitを設定
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true })); // urlencodeされたボディをパースする際のlimitを設定
app.use("/v1/students", studentsRouter);
app.use("/v1/groups", groupsRouter);
app.use("/auth/", userAuthRouter);
app.use("/v1/digests/student", stduentsDigestRouter);
app.use("/v1/digests/group", groupDigestsRouter);
app.use("/v1/", jobRouter);
app.use("/v1/job", applyJobRouter);
app.use("/v1/chat", chatRouter);
app.use("/user-content", express.static(__dirname + "/userContent"));

app.get("/", async (_req: Request, res: Response) => {
  return res.status(200).send({
    message: "Hello World!",
  });
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:3001",
      "https://www.thrink.net",
      "https://thrink.net",
      "httsp://api.thrink.net",
    ],
    credentials: true,
  },
});

setupChatSocketRouter(io);

try {
  server.listen(PORT, () => console.log("app listening on port " + PORT));
} catch (e) {
  if (e instanceof Error) {
    console.error(e.message);
  }
}

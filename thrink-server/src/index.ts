import express, { Application, Request, Response } from "express";
import { studentsRouter } from "./controllers/studentsController";
import { groupsRouter } from "./controllers/groupsController";
import { userAuthRouter } from "./controllers/userAuthController";
import { stduentsDigestRouter } from "./controllers/studentsDigestController";
import { groupDigestsRouter } from "./controllers/groupsDigestsController";
import cors from "cors";
import morgan from "morgan";
import session from "express-session";
import { jobRouter } from "./controllers/jobController";
import http from "http";
import { Server, Socket } from "socket.io";
import { setupChatSocketRouter } from "./controllers/chatSokcetController";

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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/v1/students", studentsRouter);
app.use("/v1/groups", groupsRouter);
app.use("/auth/", userAuthRouter);
app.use("/v1/digests/student", stduentsDigestRouter);
app.use("/v1/digests/group", groupDigestsRouter);
app.use("/v1/", jobRouter);

app.get("/", async (_req: Request, res: Response) => {
  return res.status(200).send({
    message: "Hello World!",
  });
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3001"],
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

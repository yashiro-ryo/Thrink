import express, { Application, Request, Response } from "express";
import { studentsRouter } from "./controllers/studentsController";
import { groupsRouter } from "./controllers/groupsController";
import { userAuthRouter } from "./controllers/userAuthController";
import { stduentsDigestRouter } from "./controllers/studentsDigestController";
import cors from "cors";
import morgan from "morgan";
import session from "express-session";

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

app.get("/", async (_req: Request, res: Response) => {
  return res.status(200).send({
    message: "Hello World!",
  });
});

try {
  app.listen(PORT, () => {
    console.log(`dev server running at: http://localhost:${PORT}/`);
  });
} catch (e) {
  if (e instanceof Error) {
    console.error(e.message);
  }
}

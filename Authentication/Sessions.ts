import cookieParser from "cookie-parser";
import { randomUUID } from "node:crypto";
import { readFileSynce, writeFileSynce } from "node:fs";

const app = express();

app.use(cookieParser());

const readSessions = () => {
  const data = readFileSynce("./session.json", "utf-8");
  return JSON.parse(data);
};

app.get("/login", (req, res) => {
  const username = req.query.username;
  const password = req.query.password;

  if (!username || !password) {
    return res.status(400).send("missing username or password");
  }

  // get hashed password
  // use bcrypt.compare
  // if invalid return 401 unauthorized

  const sessionId = randomUUID();
  const sessions = readSessions();

  sessions[sessionId] = username as String;
  writeSessions(sessions);

  res.cookie("sessionId", sessionId, {
    httpOnly: true,
    maxAge: 1000 * 60,
  });

  res.send(`session reated for ${username}`);
});

app.get("/protected", (req, res) => {
  const sessionId = req.cookies.sessionId;
  const sessions = readSessions();

  if (!sessionId || !sessions[sessionId]) {
    return res.status(401).send("no valid sesssion ");
  }

  const userId = sessions[sessionId];
  res.send(`welcome ${userId} you have a valid session`);
});

import express from "express";
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());

// set up a cookie
app.get("/setCookie", (req, res) => {
  res.cookie("flavor", "chocolate chip", {
    httpOnly: true,
    secure: true,
    maxAge: 1000 * 30,
  });

  res.send("set up a  new cookie");
});

// examine the cookie
app.get("/examineCookie", (req, res) => {
  console.log(req.cookies);

  res.send("take a look at the server logs for cookie data");
});

import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config(); // process.env
import sessionController from "./controllers/sessionController.ts";
import router from "./router/route.ts";

const PORT = 3000;

const app = express();

// const mongoURI = process.env.NODE_ENV === 'test' ? 'mongodb://localhost/unit11test' : 'mongodb://localhost/unit11dev';

const mongoURI: any = process.env.MONGO_URI;

mongoose.connect(mongoURI);

/**
 * Automatically parse urlencoded body content and form data from incoming requests and place it
 * in req.body
 */
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

app.use(
  "/client",
  express.static(path.resolve(import.meta.dirname, "../client"))
);

/**
 * --- Express Routes ---
 * Express will attempt to match these routes in the order they are declared here.
 * If a route handler / middleware handles a request and sends a response without
 * calling `next()`, then none of the route handlers after that route will run!
 * This can be very useful for adding authorization to certain routes...
 */

/**
 * root
 */

app.get("/", (req, res) => {
  res.sendFile(path.resolve(import.meta.dirname, "../client/index.html"));
});

app.use(router);

// /**
// * signup
// */
app.get("/signup", (req, res) => {
  res.sendFile(path.resolve(import.meta.dirname, "../client/signup.html"));
});

// app.post('/signup', userController.createUser , cookieController.setSSIDCookie, sessionController.startSession, (req, res) => {
//   // what should happen here on successful sign up?
//   console.log(req.cookies);
//   // return res.status(200).json(res.locals.createUser)
//   res.redirect('/secret');
// });

// /**
// * login
// */
// app.post('/login', userController.verifyUser, cookieController.setSSIDCookie, sessionController.startSession, (req, res) => {
//   // what should happen here on successful log in?
//   console.log('POST login req.cookies ', req.cookies);
//  // return res.status(200).json(res.locals.verifyUser)
//   res.redirect('/secret');
// });

// /**
// * Authorized routes
// */

// // Add this route to test cookies
// app.get('/check-cookies', (req, res) => {
//   console.log('Cookies received:', req.cookies);
//   res.json({
//     cookies: req.cookies,
//     headers: req.headers.cookie
//   });
// });

app.get("/secret", sessionController.isLoggedIn, (req, res) => {
  res.sendFile(path.resolve(import.meta.dirname, "../client/secret.html"));
});

// app.get('/secret/users', sessionController.isLoggedIn, userController.getAllUsers, (req, res) => {
//   res.send( { users: res.locals.users });
// })

// // cookie for all requests here?
// // app.use('/', cookieController.setCookie, (req, res) => {
// //   console.log(req.cookies);  // should show cookie headers
// //   res.send('set a new cookie!');
// // })

/**
 * 404 handler
 */
app.use((req, res) => {
  res.status(404).send("Not Found");
});

/**
 * Global error handler
 */
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ error: err });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
export default app;

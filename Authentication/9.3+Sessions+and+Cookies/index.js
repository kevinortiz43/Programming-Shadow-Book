import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy } from "passport-local";
import session from "express-session";
import env from "dotenv";
// need to import Strategy from passport to create new Strategy instance
// this is a local Strategy (if user has correct authentication, i.e. username, password in login.ejs file)
import { Strategy } from "passport-local";

const app = express();
const port = 3000;
const saltRounds = 10;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// using passport.js middleware after installing
app.use(
  session({
    secret: "TOPSECRETWORD",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // expiration: 1 day length cookie
    }
  })
);

// using passport and initializing
// order matters - init only AFTER you have session already running
app.use(passport.initialize());

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "secrets",
  password: "123456",
  port: 5432,
});
db.connect();

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  // if the user is authentecated then show them the secrets page if not then nope

  app.get("/secrets", (req, res) => {
    // the is authenticated is from passport.js middleware
    // console.log(req.user)
    if (req.isAuthenticated()) {
      res.render("secrets.ejs");
    } else {
      res.redirect("/login");
    }
  });

  try {
    const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (checkResult.rows.length > 0) {
      res.send("Email already exists. Try logging in.");
    } else {
      //hashing the password and saving it in the database
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.error("Error hashing password:", err);
        } else {
          console.log("Hashed Password:", hash);
          const result = await db.query( // can get result due to RETURNING 
            "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
            [email, hash]
          );
          const user = result.rows[0];
          req.login(user, (err) => {
            console.log(err)
            res.redirect("/secrets")
          })
          // res.render("secrets.ejs");
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
});

// app.post("/login",  async (req, res) => {
  // const email = req.body.username;
  // const loginPassword = req.body.password;
// });

// use passport middleware instead
// this will trigger the strategy on line 108
app.post("/login", passport.authenticate("local", {
  successRedirect: "/secrets",
  failureRedirect: "/login"
}));


// use strategy username, password, cb
// it automatically grabs the username and password from the forms we use
// passport verify() is async function
passport.use(
  new Strategy(async function verify(username, password, cb) {
    try {
      const result = await db.query("SELECT * FROM users WHERE email = $1", [
        username,
      ]);
      if (result.rows.length > 0) {
        const user = result.rows[0];
        const storedHashedPassword = user.password;
        bcrypt.compare(password, storedHashedPassword, (err, result) => {
          if (err) {
            // console.error("Error comparing passwords:", err);
            return cb(err); // if there is an err, then pass in err into cb
          } else {
            if (result) {
              // res.render("secrets.ejs");
              // 1st arg: if true, then null (no errors), 2nd arg: details of the user
              return cb(null,user)
            } else {
              return cb(null,false) // if result but no error and no user authentication, then set 2nd arg to false
              // res.send("Incorrect Password");
            }
          }
        });
      } else {
          return cb("User not found")
      }
    } catch (err) {
      return cb(err)
    }
  })
);

// we can save the data of the user that is logged in to local storage
// use cb to pass in details of user
passport.serializeUser((user,cb)=>{
  cb(null,user)
})



// access the user information in that session
passport.deserializeUser((user,cb)=>{
  cb(null,user)
})


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

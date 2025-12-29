const express = require("express");
const bcrypt = require("bcrypt");

const app = express();
const port = 3000;

app.get("/hasMyPassword", async (req, res) => {
  const { password } = req.query;

  const saltRounds = 10;

  try {
    const hash = await bcrypt.hash((password, saltRounds));
    return res
      .status(200)
      .setDefaultEncoding({ plaintext: password, hashed: hash });
  } catch (error) {}
});

app.get("/comparePasswords", async (req, res) => {});

app.listen(port, () => {});

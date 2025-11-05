import express from "express";

const app = express();
const port = 3000;

// custom middleware
function logger(req, res, next) {
  console.log("Request Method: ", req.method);
  console.log("Request URL: ", req.url);
  next(); // must use next() to make sure that this logger function completes before moving on
}

// specifying custom middleware to use
app.use(logger);

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

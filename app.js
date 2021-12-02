const express = require("express");
const connectDB = require("./config/db");
const path = require("path");

const app = express();

connectDB();

// Port Number
const port = process.env.PORT || 8080;

// Set Static Folder
app.use(express.static(path.join(__dirname, "public")));
app.use(function (req, res, next) {
  // website you wish to  allow to connet
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");

  // request method you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTION, PUT, PATCH, DELETE"
  );

  // request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type,x-auth-token"
  );

  // set to true if you need the website to include  cookies  in the  request  sent
  // to the API (eg. in case you can see sessions )
  res.setHeader("Access-Control-Allow-Credentials", "false");

  // pass to the next layer of middleware
  next();
});

//INIT middleware
app.set("view engine", "ejs");
app.use(express.json({ extended: false }));

// Index Route
app.get("/", (req, res) => {
  res.send("Hello world");
});

//Define Routes
app.use("/login", require("./routes/auth"));
app.use("/tokauth", require("./routes/tokauth"));
app.use("/booklist", require("./routes/bookList"));
app.use("/movielist", require("./routes/movieList"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// Start Server
app.listen(port, () => {
  console.log("Server started on port " + port);
});

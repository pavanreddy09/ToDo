const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const todosRouter = require("./routes/todosroutes");
const userRouter = require("./routes/userroutes");
const { connectToDB } = require("./config/db");

const app = express();

dotenv.config(); // dot env file configure

connectToDB(); // calling connectToDB function to connect to mongodb database;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());

app.use("/api/todos", todosRouter); // route of todos in todosroutes file
app.use("/api/user", userRouter); // route of user in userroutes file

let PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("listening on port 5000");
});

module.exports = { app };

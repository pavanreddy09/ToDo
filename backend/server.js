const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const todosRouter = require("./routes/todosroutes");
const userRouter = require("./routes/userroutes");

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());

app.use("/api/todos", todosRouter); // route of todos in todosroutes file
app.use("/api/user", userRouter); // route of user in userroutes file

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Conected to MongoDB");
    app.listen(process.env.PORT || 8080, () => {
      console.log("listening on port 5000");
    });
  })
  .catch((err) => console.error(err));

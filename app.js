import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.route.js";
import connectDB from "./config/mongoDB.js";
import errorHandler from "./middleware/handling.errors.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/users", userRoute);
app.use(errorHandler);

connectDB();

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.info("Server connected");
});

import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import quizzRoutes from "./routes/quizz.route.js";
import questionRoutes from "./routes/question.route.js";
import userRoutes from "./routes/user.route.js";
import errorHandler from "./middlewares/handling.errors.js";

dotenv.config();

const app = express();

app.use(cookieParser());

app.use(express.json());
app.use("/quizz", quizzRoutes);
app.use("/question", questionRoutes);
app.use("/users", userRoutes);
app.use(errorHandler);

connectDB();

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.info("Server connected");
});

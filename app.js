import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import quizzRoutes from "./routes/quizz.route.js";
import questionRoutes from "./routes/question.route.js"

dotenv.config();

const app = express();

app.use(express.json());
app.use('/quizz', quizzRoutes);
app.use('/question', questionRoutes);

connectDB();
app.listen(process.env.PORT, () => {
  console.log(`Server is running at http://localhost:${process.env.PORT}`);
});
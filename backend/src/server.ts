import app from "./app";
import dotenv from "dotenv";
import { connectDB } from "./db";
dotenv.config();

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
  connectDB();
});

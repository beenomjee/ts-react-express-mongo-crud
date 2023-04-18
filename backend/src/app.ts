import express, { json } from "express";
import cors from "cors";
import { postRouter } from "./routes";

const app = express();
app.use(cors());
app.use(json());

app.use("/api/post", postRouter);

export default app;

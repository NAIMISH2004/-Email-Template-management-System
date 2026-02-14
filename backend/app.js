import express from "express";
import cors from "cors";

import templates from "./routes/templates.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/templates", templates);

export default app;
import express from "express";
import cors from "cors";
import { config } from "dotenv";
config();

//Routes import
import authRoutes from "./routes/auth.routes.js";

const app = express();

//settings
app.set("port" , process.env.PORT);

// middlewares
app.use(express.json());
app.use(cors());

//Routes

app.use("/api/auth" , authRoutes);


export default app;
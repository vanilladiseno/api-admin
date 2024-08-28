import express from "express";
import cors from "cors";
import { config } from "dotenv";
config();

//Routes import
import authRoute from "./routes/auth.route.js";
import registerRoute from "./routes/user.route.js";

const app = express();

//settings
app.set("port" , process.env.PORT);

// middlewares
app.use(express.json());
app.use(cors());

//Routes

app.use("/api/auth" , authRoute);
app.use("/api/register" , registerRoute);

export default app;
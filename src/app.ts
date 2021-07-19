import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import express from "express";

// --- Config + Initiate server ---
dotenv.config(); // read key-value pairs from .env
const port = process.env.PORT_NUMBER_HERE || 3000; //

const app = express(); // create an express app server

// --- Top Lv Middlwares ---
app.use(express.json()); // TLDR can send json data from FE to endpoints
app.use(morgan(":method :url :status :res[content-length] - :response-time ms")); // TLDR logger
app.use(cors()); // TLDR allow dif origin to HTTP to this server

// --- Run server ---
app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});

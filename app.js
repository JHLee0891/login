import express from "express";
import connect from "./schemas/index.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3000;
connect();

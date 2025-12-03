import express, { Request, Response } from "express";

import iniDB from "./config/db";
import logger from "./middleware/logger";
import { userRoutes } from "./modules/user/user.route";
import { todosRouter } from "./modules/todos/todos.route";
import { authRouter } from "./modules/auth/auth.route";
const app = express();

// parser

app.use(express.json());

iniDB();

// logger middleware

app.get("/", logger, (req: Request, res: Response) => {
  res.send("Hello world!!");
});

// user
app.use("/users", userRoutes);

// todos crud
app.use("/todos", todosRouter);

app.use("/auth", authRouter);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.path,
  });
});
export default app;

import express, { Request, Response } from "express";
import router from "./router/route";
import prisma from "./prisma/prisma";

const app = express();
app.use(express.json());

app.get("/", async (req: Request, res: Response) => {
  res.send("hello world");
});

app.use("/api", router);

app.listen(4000, () => {
  console.log("APP STARTED ");
});

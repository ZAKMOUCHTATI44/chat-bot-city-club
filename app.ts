import express, { Request, Response } from "express";
import router from "./router/route";

const app = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("HELLO WORLD ");
});

app.use("/api", router);

app.listen(4000, () => {
  console.log("APP STARTED ");
});

import express, { Request, Response } from "express";
const router = express.Router();

router.post("/chat-bot", (req: Request, res: Response) => {
  let message = req.body;
  console.log(message);

  res.status(200).end();
});

export default router;

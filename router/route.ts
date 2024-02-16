import express, { Request, Response } from "express";
const router = express.Router();
import { PrismaClient } from "@prisma/client";
import { sendMessage } from "../utils/Message";
import { chatbot } from "../controllers/chatBotController";

const prisma = new PrismaClient();

router.post("/chat-bot", chatbot);

router.get("/posts", async (req: Request, res: Response) => {
  const allposts = await prisma.post.findMany();
  console.log(allposts);
});

router.post("/posts", async (req: Request, res: Response) => {
  const post = await prisma.post.create({
    data: {
      title: "HELLO WORLD ",
      content: "LOREM 20",
    },
  });
  console.log(post);
});
export default router;

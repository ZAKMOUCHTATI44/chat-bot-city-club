import prisma from "../prisma/prisma";
import { Message } from "@prisma/client";

interface MessageRequest {
  messageId: string;
  to: string;
  from: string;
  type: "text" | "custom" | "unsupported" | "reply";
  body: string;
  latitude?: number | null;
  longitude?: number | null;
}
export async function saveMessage(data: MessageRequest): Promise<Message> {
  const message = await prisma.message.create({
    data: {
      body: data.body ?? "",
      type: data.type,
      from: data.from,
      to: data.to,
      messageId: data.messageId,
      latitude: data.latitude,
      longitude: data.longitude,
    },
  });
  return message;
}

export async function getMessage(phone: string): Promise<Message | null> {
  const message = await prisma.message.findFirst({
    where: {
      from: phone,
    },
    orderBy: {
      id: "desc",
    },
    take: 1,
  });

  return message;
}

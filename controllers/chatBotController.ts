import { Request, Response } from "express";
import { sendMessage } from "../utils/Message";
import { Lang, MessageRequest } from "../types";
import { getMenu, welcomeMessage } from "../utils/Default";
import { createOrUpdateLead } from "./leadController";

export async function chatbot(req: Request, res: Response) {
  let message: MessageRequest = req.body;

  switch (message.message_type) {
    case "reply":
      let { id, title, description } = message?.reply;
      if (id.includes("btn-lang-fr")) {
        sendMessage({
          channel: "whatsapp",
          from: message.to,
          to: message.from,
          message_type: "custom",
          custom: getMenu(Lang.FR),
        });

        createOrUpdateLead({
          lang: Lang.FR,
          phone: message.from,
          profileName: message.profile.name,
        });
      } else if (id.includes("btn-lang-ar")) {
        sendMessage({
          channel: "whatsapp",
          from: message.to,
          to: message.from,
          message_type: "custom",
          custom: getMenu(Lang.AR),
        });
        createOrUpdateLead({
          lang: Lang.AR,
          phone: message.from,
          profileName: message.profile.name,
        });
      }

      break;
    case "unsupported":
      break;
    default:
      sendMessage({
        channel: "whatsapp",
        from: message.to,
        to: message.from,
        message_type: "custom",
        custom: welcomeMessage(),
      });
      break;
  }
  res.status(200).end();
}

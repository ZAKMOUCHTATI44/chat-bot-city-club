import { Request, Response } from "express";
import { sendMessage } from "../utils/Message";
import { Lang, MessageRequest } from "../types/app";
import { buttonMenu, getMenu, welcomeMessage } from "../utils/Default";
import { createOrUpdateLead, getLang } from "./leadController";
import { getResponse } from "../steps/Steps";

export async function chatbot(req: Request, res: Response) {
  let message: MessageRequest = req.body;

  switch (message.message_type) {
    case "reply":
      let { id, title, description } = message?.reply;
      if (id.includes("btn-lang-fr")) {
        let custom = await getMenu(Lang.FR);
        sendMessage({
          channel: "whatsapp",
          from: message.to,
          to: message.from,
          message_type: "custom",
          custom,
        });

        createOrUpdateLead({
          lang: Lang.FR,
          phone: message.from,
          profileName: message.profile.name,
        });
      } else if (id.includes("btn-lang-ar")) {
        let custom = await getMenu(Lang.AR);
        sendMessage({
          channel: "whatsapp",
          from: message.to,
          to: message.from,
          message_type: "custom",
          custom,
        });

        createOrUpdateLead({
          lang: Lang.AR,
          phone: message.from,
          profileName: message.profile.name,
        });
      } else if (id.includes("option")) {
        let step = id.replace("option", "");
        let text = await getResponse(Number(step), message.from);
        sendMessage({
          channel: "whatsapp",
          from: message.to,
          to: message.from,
          message_type: "text",
          text,
        });

        if (!id.includes(["1", "5"])) {
          setTimeout(async () => {
            let custom = await buttonMenu(message.from);
            sendMessage({
              channel: "whatsapp",
              from: message.to,
              to: message.from,
              message_type: "custom",
              custom,
            });
          }, 5000);
        }
      } else if (id.includes("menu-default")) {
        const lang = await getLang(message.from);
        sendMessage({
          channel: "whatsapp",
          from: message.to,
          to: message.from,
          message_type: "custom",
          custom: getMenu(Lang.FR),
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

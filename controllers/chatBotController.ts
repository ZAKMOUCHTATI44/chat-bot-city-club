import { Request, Response } from "express";
import { sendMessage } from "../utils/Message";
import { Lang, MessageRequest } from "../types/app";
import { buttonMenu, getMenu, welcomeMessage } from "../utils/Default";
import { createOrUpdateLead, getLang } from "./leadController";
import { getResponse } from "../steps/Steps";
import { getMessage, saveMessage } from "./messageController";
import { clubsOptions, getClub } from "./clubsController";

export async function chatbot(req: Request, res: Response) {
  let message: MessageRequest = req.body;
  let step: string = "";

  console.log(message);

  const lastMessage = await getMessage(message.from);

  if (lastMessage && lastMessage.step === 4) {
    const lang = await getLang(message.from);
    sendMessage({
      channel: "whatsapp",
      from: message.to,
      to: message.from,
      message_type: "text",
      text:
        lang === Lang.AR
          ? "شكرًا لاتصالك بنا، سيتم تعيين مستشار هاتفي لمعالجة شكواك في أقرب وقت ممكن."
          : "Merci de nous avoir contacté, un téléconseiller prendra en charge votre réclamation dans les plus brefs délais.",
    });
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
  } else {
    switch (message.message_type) {
      case "location":
        sendMessage({
          channel: "whatsapp",
          from: message.to,
          to: message.from,
          message_type: "custom",
          custom: await clubsOptions(message.from),
        });
        break;
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
        } else if (id.includes("location")) {
          sendMessage({
            channel: "whatsapp",
            from: message.to,
            to: message.from,
            message_type: "custom",
            custom: getClub(description),
          });
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
        } else if (id.includes("option")) {
          step = id.replace("option", "");
          let text = await getResponse(Number(step), message.from);
          sendMessage({
            channel: "whatsapp",
            from: message.to,
            to: message.from,
            message_type: "text",
            text,
          });

          if (!["1", "4"].includes(step)) {
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

          let custom = await getMenu(lang);
          sendMessage({
            channel: "whatsapp",
            from: message.to,
            to: message.from,
            message_type: "custom",
            custom,
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
  }

  saveMessage({
    body: message.text ?? "",
    from: message.from,
    to: message.to,
    type: message.message_type,
    step: Number(step),
    messageId: message.message_uuid ?? "",
  });
  res.status(200).end();
}

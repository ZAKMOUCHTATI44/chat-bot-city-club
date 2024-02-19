import { Lang } from "../types/app";
import prisma from "../prisma/prisma";
import { getLang } from "../controllers/leadController";

export async function getMenu(lang: Lang) {
  let rows = await getSteps(lang);
  let body = {
    fr: "Veuillez appuyer sur options pour choisir l’un de nos services",
    ar: "يرجى الضغط على الخيارات لاختيار أحد خدماتنا",
  };

  let custom = {
    type: "interactive",
    interactive: {
      type: "list",
      header: {
        type: "text",
        text: lang === Lang.AR ? "سيتي كلوب" : "City Club",
      },
      body: {
        text: lang === Lang.AR ? body.ar : body.fr,
      },
      footer: {
        text: " ",
      },
      action: {
        button: lang === Lang.AR ? "خيارات" : "options",
        sections: [
          {
            title:
              lang === Lang.AR ? "حدد اختيارك" : "Sélectionner votre choix",
            rows,
          },
        ],
      },
    },
  };

  return custom;
}

export function welcomeMessage() {
  let custom = {
    type: "interactive",
    interactive: {
      type: "button",
      header: {
        type: "text",
        text: "Bonjour",
      },
      body: {
        text: "Merci d'avoir contacté City Club ! Veuillez sélectionner votre langue . \nمرحبًا ، شكرًا على تواصلك مع سيتي كلوب ! الرجاء تحديد اللغة. ",
      },
      footer: {
        text: "Veuillez sélectionner une langue.",
      },
      action: {
        buttons: [
          {
            type: "reply",
            reply: {
              id: "btn-lang-fr",
              title: "Français",
            },
          },
          {
            type: "reply",
            reply: {
              id: "btn-lang-ar",
              title: "Arabe",
            },
          },
        ],
      },
    },
  };

  return custom;
}

export async function getSteps(lang: Lang): Promise<any> {
  const options = await prisma.step.findMany();

  const rows = options.map((option) => {
    const row = {
      id: `option${option.id}`,
      title: " ",
      description: lang === Lang.AR ? option.textAr : option.textFr,
    };

    return row;
  });

  return rows;
}

export const buttonMenu = async (phone: string) => {
  const lang = await getLang(phone);

  let custom = {
    type: "interactive",
    interactive: {
      type: "button",
      body: {
        text:
          lang === Lang.AR
            ? "للعودة إلى القائمة، انقر أدناه"
            : "Veuillez appuyer ci-dessous pour revenir au menu principal !",
      },
      action: {
        buttons: [
          {
            type: "reply",
            reply: {
              id: "menu-default",
              title: lang === Lang.AR ? "القائمة" : "Menu",
            },
          },
        ],
      },
    },
  };

  return custom;
};

import { Lang } from "../types/app";
import prisma from "../prisma/prisma";

export async function getMenu(lang: Lang) {
  let rows = await getSteps(lang);
  let body = {
    fr: "Bonjour 👋😁, Merci d'avoir contacté City Club ! Veuillez sélectionner votre langue.",
    ar: "مرحبًا ، شكرًا على تواصلك مع سيتي كلوب ! الرجاء تحديد اللغة.",
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

const options = {
  fr: [
    {
      id: "option1",
      title: " ",
      description: "📍 City Club autour de moi",
    },
    {
      id: "option2",
      title: " ",
      description: "🏋️‍♂️ Comment puis-je m'inscrire à la salle de sport ?",
    },
    {
      id: "option3",
      title: " ",
      description: "🌐 s'abonner à nos pages ou visiter nos sites web",
    },
    {
      id: "option4",
      title: " ",
      description: "⚠️ Soumettre une réclamation",
    },
    {
      id: "option5",
      title: " ",
      description: "🕐 Quels sont vos horaires d'ouverture ?",
    },
    {
      id: "option6",
      title: " ",
      description:
        "👫 Puis-je apporter un invité avec moi à la salle de sport ?",
    },
    {
      id: "option7",
      title: " ",
      description: "❌ Comment puis-je annuler mon abonnement ?",
    },
    {
      id: "option8",
      title: " ",
      description: "🥗 Proposez-vous des programmes nutritionnels ?",
    },
  ],
  ar: [
    {
      id: "option1",
      title: " ",
      description: "📍 النادي الرياضي القريب مني",
    },
    {
      id: "option2",
      title: " ",
      description: "🏋️‍♂️ كيف يمكنني التسجيل في صالة الألعاب الرياضية؟",
    },
    {
      id: "option3",
      title: " ",
      description: "🌐 الاشتراك في صفحاتنا أو زيارة مواقعنا على الإنترنت",
    },
    {
      id: "option4",
      title: " ",
      description: "⚠️ تقديم شكوى",
    },
    {
      id: "option5",
      title: " ",
      description: "🕐 ما هي ساعات عملكم؟",
    },
    {
      id: "option6",
      title: " ",
      description: "👫 هل يمكنني إحضار ضيف معي إلى صالة الألعاب الرياضية؟",
    },
    {
      id: "option7",
      title: " ",
      description: "❌ كيف يمكنني إلغاء اشتراكي؟",
    },
    {
      id: "option8",
      title: " ",
      description: "🥗 هل تقدمون برامج تغذية؟",
    },
  ],
};

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

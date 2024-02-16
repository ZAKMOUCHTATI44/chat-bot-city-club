import { Lang } from "../types";

export function getMenu(lang: Lang) {
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
        text: lang === Lang.AR ? "كارفور" : "Carrefour",
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
            rows: lang === Lang.AR ? options.ar : options.fr,
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
      id: "option4",
      title: " ",
      description: "🌐 s'abonner à nos pages ou visiter nos sites web",
    },
    {
      id: "option5",
      title: " ",
      description: "⚠️ Soumettre une réclamation",
    },
    {
      id: "option6",
      title: " ",
      description: "🕐 Quels sont vos horaires d'ouverture ?",
    },
    {
      id: "option7",
      title: " ",
      description:
        "💆‍♂️ Proposez-vous des services de massage ou de physiothérapie dans votre salle de sport ?",
    },
    {
      id: "option8",
      title: " ",
      description:
        "👫 Puis-je apporter un invité avec moi à la salle de sport ?",
    },
    {
      id: "option9",
      title: " ",
      description:
        "👵🧑‍🦽 Proposez-vous des programmes d'entraînement spécifiques pour les personnes âgées ou les personnes ayant des besoins spéciaux ?",
    },
    {
      id: "option10",
      title: " ",
      description: "❌ Comment puis-je annuler mon abonnement ?",
    },
    {
      id: "option11",
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
      id: "option4",
      title: " ",
      description: "🌐 الاشتراك في صفحاتنا أو زيارة مواقعنا على الإنترنت",
    },
    {
      id: "option5",
      title: " ",
      description: "⚠️ تقديم شكوى",
    },
    {
      id: "option6",
      title: " ",
      description: "🕐 ما هي ساعات عملكم؟",
    },
    {
      id: "option7",
      title: " ",
      description:
        "💆‍♂️ هل تقدمون خدمات تدليك أو علاج طبيعي في صالة الألعاب الرياضية؟",
    },
    {
      id: "option8",
      title: " ",
      description: "👫 هل يمكنني إحضار ضيف معي إلى صالة الألعاب الرياضية؟",
    },
    {
      id: "option9",
      title: " ",
      description:
        "👵🧑‍🦽 هل تقدمون برامج تدريب خاصة لكبار السن أو لأولئك الذين لديهم احتياجات خاصة؟",
    },
    {
      id: "option10",
      title: " ",
      description: "❌ كيف يمكنني إلغاء اشتراكي؟",
    },
    {
      id: "option11",
      title: " ",
      description: "🥗 هل تقدمون برامج تغذية؟",
    },
  ],
};

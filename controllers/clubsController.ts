import { Lang } from "../types/app";
import { getLang } from "./leadController";

export async function clubsOptions(phone: string): Promise<any> {
  let lang = await getLang(phone);
  let clubs = [
    "Club Abdelmoumen",
    "Club Ain Sebaa",
    "Club Zerktouni 1",
    "Club Emile Zola",
    "Club Mohamed 5",
    "Club ANFA",
    "Club Bourgogne",
    "Club Lissasfa",
    "Club Zerktouni 2",
    "Hay Hassani",
  ];

  let rows = clubs.map((club, index) => {
    return {
      id: `location${index}`,
      title: " ",
      description: club,
    };
  });

  let custom = {
    type: "interactive",
    interactive: {
      type: "list",
      header: {
        type: "text",
        text: lang === Lang.AR ? "سيتي كلوب" : "City Club",
      },
      body: {
        text:
          lang === Lang.AR
            ? "اختر نادي الاقرب إليك"
            : "Voici les clubs les plus proches de chez vous , choisissez le vôtre",
      },
      action: {
        button: lang === Lang.AR ? "خيارات" : "Options",
        sections: [
          {
            title: lang === Lang.AR ? "هنا نادي :" : "Voici vos clubs :",
            rows: rows,
          },
        ],
      },
    },
  };

  return custom;
}

export async function getClub(name: string) : Promise<any> {
  let custom = {
    type: "location",
    location: {
      longitude: -7.6287252,
      latitude: 33.5709079,
      name: name,
      address: "250 Bd Abdelmoumen, Casablanca 20000",
    },
  };

  return custom
}

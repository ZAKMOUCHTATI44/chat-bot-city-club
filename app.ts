import express, { Request, Response } from "express";
import router from "./router/route";
import prisma from "./prisma/prisma";

const app = express();
app.use(express.json());

app.get("/", async (req: Request, res: Response) => {
  const dataSteps = [
    {
      id: 1,
      textAr: "📍 النادي الرياضي القريب ",
      textFr: "📍 City Club autour de moi",
      descriptionAr: "يرجى مشاركة موقعك معنا📍",
      descriptionFr: "Merci de nous partager votre localisation📍",
    },
    {
      id: 2,
      textAr: "🏋️‍♂️ كيف يمكنني التسجيل في صالة الألعاب الرياضية؟",
      textFr: "🏋️‍♂️ Comment puis-je m'inscrire à la salle de sport ?",
      descriptionAr:
        "يمكنك التسجيل في صالة الرياضة الخاصة بنا عبر الإنترنت عن طريق ملء استمارة التسجيل على موقعنا على الرابط التالي: https://cityclub.fitness/reservation/  أو عن طريق الاتصال بنا على الرقم الموجود على صفحة اتصالنا.",
      descriptionFr:
        "Vous pouvez vous inscrire à notre salle de sport en ligne en remplissant le formulaire d'inscription sur notre site web sur le lien suivant : https://cityclub.fitness/reservation/ ou en nous appelant au numéro indiqué sur notre page de contact",
    },
    {
      id: 3,
      textAr: "🌐 الاشتراك في صفحاتنا أو زيارة مواقعنا على الإنترنت",
      textFr: "🌐 s'abonner à nos pages ou visiter nos sites web",
      descriptionAr:
        "للوصول إلى مواقعنا على الويب ، ندعوك للنقر على الروابط أدناه 👇",
      descriptionFr:
        "Afin d’accéder à nos sites web, nous vous invitons à appuyer sur les liens ci-dessous 👇",
    },
    {
      id: 4,
      textAr: "⚠️ تقديم شكوى",
      textFr: "⚠️ Soumettre une réclamation",
      descriptionAr: "Pourriez-vous nous en dire plus ? 🤔",
      descriptionFr: "هل يمكنكم تزويدنا بمزيد من المعلومات؟ 🤔",
    },
    {
      id: 5,
      textAr: "🕐 ما هي ساعات عملكم؟",
      textFr: "🕐 Quels sont vos horaires d'ouverture ?",
      descriptionAr: "يرجى مشاركة موقعك معنا📍",
      descriptionFr: "Merci de nous partager votre localisation📍",
    },
    {
      id: 6,
      textAr: "👫 هل يمكنني إحضار ضيف معي إلى صالة الألعاب الرياضية؟",
      textFr: "👫 Puis-je apporter un invité avec moi à la salle de sport ?",
      descriptionAr:
        "نعم، بعض اشتراكاتنا توفر إمكانية إحضار ضيف معك إلى صالة الألعاب الرياضية. يرجى التحقق من تفاصيل اشتراكك أو التواصل مع فريق الاستقبال لدينا لمزيد من المعلومات.",
      descriptionFr:
        "Oui, certains de nos abonnements offrent la possibilité d'apporter un invité avec vous à la salle de sport. Veuillez consulter les détails de votre abonnement ou contacter notre équipe de réception pour plus d'informations.",
    },
    {
      id: 7,
      textAr: "كيف يمكنني إلغاء اشتراكي؟ ❌ ",
      textFr: "❌ Comment puis-je annuler mon abonnement ?",
      descriptionAr:
        " لإلغاء اشتراكك، يرجى التواصل معنا مباشرة عبر الهاتف أو البريد الإلكتروني، أو زيارة استقبالنا لمناقشة الخيارات المتاحة. يرجى ملاحظة أن شروط الإلغاء قد تنطبق حسب نوع الاشتراك الذي تمتلكه.",
      descriptionFr:
        "Pour annuler votre abonnement, veuillez nous contacter directement par téléphone ou par e-mail, ou bien rendez-vous à notre réception pour discuter des options disponibles. Veuillez noter que des conditions d'annulation peuvent s'appliquer selon le type d'abonnement souscrit.",
    },
    {
      id: 8,
      textAr: " هل تقدمون برامج تغذية؟ 🥗 ",
      textFr: "🥗 Proposez-vous des programmes nutritionnels ?",
      descriptionAr:
        "نعم، نحن نقدم برامج تغذية مخصصة مصممة لمساعدتك في تحقيق أهدافك في اللياقة. يمكنك تحديد موعد مع أحد أخصائيي التغذية لدينا للحصول على نصائح مخصصة",
      descriptionFr:
        "Oui, nous proposons des programmes nutritionnels personnalisés conçus pour vous aider à atteindre vos objectifs de remise en forme. Vous pouvez prendre rendez-vous avec l'un de nos nutritionnistes pour obtenir des conseils personnalisés.",
     
    },
  ];

  const steps = await prisma.step.createMany({
    data: dataSteps,
  });

  res.send("hello world");
});

app.use("/api", router);

app.listen(4000, () => {
  console.log("APP STARTED ");
});

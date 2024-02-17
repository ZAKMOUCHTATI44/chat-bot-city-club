import { getLang } from "../controllers/leadController";
import { Lang } from "../types/app";
import prisma from "../prisma/prisma";

export async function getResponse(
  step: number,
  phone: string
): Promise<string> {
  const lang = await getLang(phone);

  const currentStep = await prisma.step.findFirst({
    where: {
      id: step,
    },
  });

  if (currentStep !== null) {
    if (lang === Lang.AR) {
      return currentStep.descriptionAr;
    } else {
      return currentStep.descriptionFr;
    }
  }

  return "";
}

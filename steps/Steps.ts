import { getLang } from "../controllers/leadController";
import { Lang } from "../types/app";
import prisma from "../prisma/prisma";

export async function getResponse(
  step: number,
  phone: string
): Promise<string> {
  const lang = await getLang(phone);

  const currentStep = await prisma.steps.findFirst({
    where: {
      id: step,
    },
  });

  if (currentStep !== null) {
    if (lang === Lang.AR) {
      return currentStep.textAr;
    } else {
      return currentStep.textFr;
    }
  }

  return "";
}

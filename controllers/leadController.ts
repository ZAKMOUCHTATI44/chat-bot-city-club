import { Lead } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { Lang } from "../types/app";

export const createOrUpdateLead = async (data: {
  lang: Lang;
  phone: string;
  profileName: string;
}) => {
  let lead;
  const leadExists = await prisma.lead.findFirst({
    where: {
      phone: data.phone,
    },
  });

  if (leadExists) {
    lead = await prisma.lead.update({
      where: {
        phone: data.phone,
      },
      data: {
        lang: data.lang,
        profileName: data.profileName,
      },
    });
  } else {
    lead = await prisma.lead.create({
      data: {
        phone: data.phone,
        lang: data.lang,
        profileName: data.profileName,
      },
    });
  }
};

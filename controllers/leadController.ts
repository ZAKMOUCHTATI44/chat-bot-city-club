import { Lead } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { Lang } from "../types/app";

export const createOrUpdateLead = async (data: {
  lang: Lang;
  phone: string;
  profileName: string;
}) => {
  const lead = await prisma.lead.upsert({
    where: {
      phone: data.phone,
    },
    update: {
      lang: data.lang,
    },
    create: {
      profileName: data.profileName,
      lang: data.lang,
      phone: data.phone,
    },
  });
};

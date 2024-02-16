import { Lead } from "@prisma/client";
import prisma from "../prisma/prisma";
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

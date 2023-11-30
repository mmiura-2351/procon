import { prisma } from "@/utils/Prisma/PrismaClient";

export const getAllergies = async () => {
  const userAllergies = await prisma.userAllergy.findMany({
    select: {
      userAllergyId: true,
      userId: true,
      allergyId: true,
      allergy: {
        select: {
          allergyId: true,
          allergyName: true,
        },
      },
    },
  });

  return userAllergies;
};

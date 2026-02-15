"use server";
import { validateAdmin } from "@/actions/auth/admin.action";
import { db } from "@/lib/db";
export const getHealthBenefits = async (): Promise<{ label: string }[]> => {
  try {
    await validateAdmin();
    return db.healthBenefit.findMany({
      select: {
        label: true,
      },
    });
  } catch (err) {
    return [];
  }
};

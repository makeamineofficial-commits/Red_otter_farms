import { db } from "@/lib/db";
import { SurveyFormData } from "@/app/(root)/(user)/(public)/(others)/survey/page";

export async function submitSurvey(data: SurveyFormData) {
  try {
    const exist = await db.survey.findFirst({
      where: {
        OR: [
          {
            phone: data.phone,
          },
          {
            email: data.email,
          },
        ],
      },
    });

    if (exist) return { success: true, message: "Already submitted" };
    await db.survey.create({ data: data });
    if (exist) return { success: true, message: "Survey submitted" };
  } catch (err: any) {
    console.error("[SURVEY] Error submitting survey", err.message);
    return { success: false, message: "Error submitting survey" };
  }
}

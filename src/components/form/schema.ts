import { z } from "zod";

export type QuestionData = z.infer<typeof questionDataSchema>;
export type FormValues = z.infer<typeof formValuesSchema>;

export const questionDataSchema = z.object({
  sections: z.array(
    z.object({
      id: z.string().min(1),
      label: z.string(),
      questions: z.array(
        z.object({
          id: z.string().min(1),
          label: z.string(),
          subquestions: z.array(
            z.object({
              id: z.string().min(1),
              label: z.string(),
            })
          ),
        })
      ),
    })
  ),
});

export const formValuesSchema = z.record(
  z.string().min(1),
  z.record(
    z.string().min(1),
    z.record(z.string().min(1), z.number().min(1).max(7).nullable())
  )
);

export function getEmptyDefaultValues(data: QuestionData): FormValues {
  const formValues: FormValues = {};
  for (const section of data.sections) {
    formValues[section.id] = {};
    for (const question of section.questions) {
      formValues[section.id][question.id] = {};
      for (const subquestion of question.subquestions) {
        formValues[section.id][question.id][subquestion.id] = null;
      }
    }
  }
  return formValues;
}

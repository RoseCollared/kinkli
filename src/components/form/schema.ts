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

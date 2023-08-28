import { z } from "zod";

export type TSubquestion = z.infer<typeof subquestionSchema>;
export const subquestionSchema = z.object({
  id: z.string().min(1),
  label: z.string(),
});

export type TQuestion = z.infer<typeof questionSchema>;
export const questionSchema = z.object({
  id: z.string().min(1),
  label: z.string(),
});

export type TSection = z.infer<typeof sectionSchema>;
export const sectionSchema = z.object({
  id: z.string().min(1),
  label: z.string(),
  questions: z.array(questionSchema).min(1),
  subquestions: z.array(subquestionSchema).min(1), // TODO: make this optional or set a default
});

export type TKinks = z.infer<typeof kinksSchema>;
export const kinksSchema = z.object({
  sections: z.array(sectionSchema),
});

export type FormValues = z.infer<typeof formValuesSchema>;
export const formValuesSchema = z.record(
  z.string().min(1),
  z.record(
    z.string().min(1),
    z.record(z.string().min(1), z.number().min(1).max(7).nullable())
  )
);

import { z } from "zod";

export type Subquestion = z.infer<typeof subquestionSchema>;
export const subquestionSchema = z.object({
  id: z.string().min(1),
  label: z.string(), // TODO: make this optional?
});

export type Question = z.infer<typeof questionSchema>;
export const questionSchema = z.object({
  id: z.string().min(1),
  label: z.string(),
  subquestions: z.array(subquestionSchema), // TODO: handle case where this is empty
});

export type Section = z.infer<typeof sectionSchema>;
export const sectionSchema = z.object({
  id: z.string().min(1),
  label: z.string(),
  questions: z.array(questionSchema).min(1),
});

export type Kinks = z.infer<typeof kinksSchema>;
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

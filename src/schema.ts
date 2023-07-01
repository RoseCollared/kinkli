import { z } from "zod";

export const dataSchema = z.object({
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

export const formSchema = z.record(
  z.string().min(1),
  z.record(
    z.string().min(1),
    z.record(z.string().min(1), z.number().min(0).max(7))
  )
);

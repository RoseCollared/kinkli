import type { Kinks, FormValues } from "./schema";

export function getEmptyDefaultValues(data: Kinks): FormValues {
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

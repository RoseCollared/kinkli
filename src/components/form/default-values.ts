import type { TFormValues, TKinks } from "./schema";

export function getEmptyDefaultValues(data: TKinks): TFormValues {
  const formValues: TFormValues = {};
  for (const section of data.sections) {
    formValues[section.id] = {};
    for (const question of section.questions) {
      formValues[section.id][question.id] = {};
      for (const subquestion of section.subquestions) {
        formValues[section.id][question.id][subquestion.id] = null;
      }
    }
  }
  return formValues;
}

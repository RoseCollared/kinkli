"use client";

import { decodeValues } from "@kinklist/utils";
import { useSearchParams } from "next/navigation";
import { FormHTMLAttributes, forwardRef, useMemo } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import kinks from "../../../public/kinks.json";
import { Button } from "../button";
import { Radio } from "../radio";
import { getEmptyDefaultValues } from "./default-values";
import {
  kinksSchema,
  type FormValues,
  type TQuestion,
  type TSection,
  type TSubquestion,
} from "./schema";
import { useSaveAnswers } from "./use-save-answers";

export const Form = forwardRef<
  HTMLFormElement,
  FormHTMLAttributes<HTMLFormElement>
>((props, ref) => {
  const parsedKinks = kinksSchema.parse(kinks);

  const searchParams = useSearchParams();

  const methods = useForm<FormValues>({
    defaultValues: async () => {
      const encodedValues = searchParams.get("answers");
      if (encodedValues) {
        const shape = getEmptyDefaultValues(parsedKinks);
        return decodeValues(encodedValues, shape);
      } else {
        return getEmptyDefaultValues(parsedKinks);
      }
    },
  });

  useSaveAnswers(methods, getEmptyDefaultValues(parsedKinks));

  return (
    <FormProvider {...methods}>
      <form
        ref={ref}
        className="relative columns-1 gap-x-4 py-8 sm:py-12 xl:columns-2 min-[1688px]:columns-3"
        {...props}
      >
        <Button
          onClick={() => {
            if (confirm("Are you sure you want to clear all data?")) {
              methods.reset(getEmptyDefaultValues(parsedKinks));
            }
          }}
          variant="secondary"
          className="absolute right-0 top-0 border-none px-3 py-2 text-base shadow-none"
        >
          Clear all
        </Button>
        {parsedKinks.sections.map((section) => (
          <Section
            key={section.id}
            sectionId={section.id}
            label={section.label}
            questions={section.questions}
          />
        ))}
      </form>
    </FormProvider>
  );
});

Form.displayName = "Form";

interface SectionProps {
  sectionId: TSection["id"];
  label: TSection["label"];
  questions: TSection["questions"];
}
function Section({ sectionId, label, questions }: SectionProps) {
  const subquestionLabels = useMemo(() => {
    const uniqueLabels = questions
      .flatMap((question) =>
        question.subquestions.map((subquestion) => subquestion.label)
      )
      // Remove undefined and empty string
      .filter((label) => label)
      // Keep only unique values
      .filter((label, index, array) => array.indexOf(label) === index);

    if (uniqueLabels.length > 2) {
      console.warn(
        `Found more than 2 unique subquestion labels for section ${sectionId}. Using the first two only`
      );
      return [uniqueLabels[0], uniqueLabels[1]];
    }

    return uniqueLabels;
  }, [questions, sectionId]);

  return (
    <section className="mb-4 break-inside-avoid-column rounded-xl border-2 border-rose-300 bg-white p-4 shadow-xl shadow-rose-100">
      <h2 className="text-2xl font-semibold drop-shadow-sm">{label}</h2>
      <table className="-mx-4 -my-2 border-separate border-spacing-x-4 border-spacing-y-2">
        <thead>
          <tr>
            <th />
            {subquestionLabels.length > 1 &&
              subquestionLabels.map((label) => (
                <th key={label} className="text-lg font-medium text-gray-600">
                  {label}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {questions.map((question) => (
            <Question
              key={question.id}
              questionId={question.id}
              sectionId={sectionId}
              label={question.label}
              subquestions={question.subquestions}
            />
          ))}
        </tbody>
      </table>
    </section>
  );
}

interface QuestionProps {
  questionId: TQuestion["id"];
  sectionId: TSection["id"];
  label: TQuestion["label"];
  subquestions: TQuestion["subquestions"];
}
function Question(props: QuestionProps) {
  const { questionId, sectionId, label, subquestions } = props;
  return (
    <tr>
      <td className="w-40 text-lg font-medium leading-tight text-gray-600">
        {label}
      </td>
      {subquestions.map((subquestion) => (
        <Subquestion
          key={subquestion.id}
          subquestionId={subquestion.id}
          questionId={questionId}
          sectionId={sectionId}
        />
      ))}
    </tr>
  );
}

interface SubquestionProps {
  subquestionId: TSubquestion["id"];
  questionId: TQuestion["id"];
  sectionId: TSection["id"];
}
function Subquestion(props: SubquestionProps) {
  const { subquestionId, questionId, sectionId } = props;
  const { register } = useFormContext();
  const name = `${sectionId}.${questionId}.${subquestionId}`;

  return (
    <td>
      <div className="flex gap-0.5">
        <Radio {...register(name)} value="7" />
        <Radio {...register(name)} value="6" />
        <Radio {...register(name)} value="5" />
        <Radio {...register(name)} value="4" />
        <Radio {...register(name)} value="3" />
        <Radio {...register(name)} value="2" />
        <Radio {...register(name)} value="1" />
      </div>
    </td>
  );
}

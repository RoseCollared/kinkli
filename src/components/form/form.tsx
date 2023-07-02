"use client";

import {
  kinksSchema,
  type FormValues,
  type TSection,
  type TQuestion,
  type TSubquestion,
} from "./schema";
import { decodeValues, encodeValues } from "@kinklist/utils";
import { useSearchParams } from "next/navigation";
import { FormHTMLAttributes, forwardRef, useMemo } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import kinks from "../../../public/kinks.json";
import { Radio } from "../radio";
import { getEmptyDefaultValues } from "./default-values";

export const Form = forwardRef<
  HTMLFormElement,
  FormHTMLAttributes<HTMLFormElement>
>((props, ref) => {
  const searchParams = useSearchParams();

  const parsedKinks = kinksSchema.parse(kinks);

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

  methods.watch((values) => {
    if (Object.keys(values).length > 0) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("answers", encodeValues(values));
      // HACK: use history API because Next.js router.replace() always scrolls to top
      // See: https://github.com/vercel/next.js/issues/50105#issuecomment-1585699851
      history.replaceState(null, "", "?" + params.toString());
    }
  });

  return (
    <FormProvider {...methods}>
      <form
        ref={ref}
        className="columns-1 gap-x-4 px-8 py-12 sm:px-12 sm:py-16 xl:columns-2 2xl:columns-3"
        {...props}
      >
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
    <section className="mb-4 break-inside-avoid-column rounded-xl border-2 border-rose-300 bg-white p-6 shadow-xl shadow-rose-100">
      <h2 className="text-2xl font-semibold drop-shadow-sm sm:text-2xl lg:text-3xl">
        {label}
      </h2>
      <table className="-mx-4 -my-2 border-separate border-spacing-x-4 border-spacing-y-2">
        <thead>
          <tr>
            <th />
            {subquestionLabels.map((label) => (
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
      <td className="w-32 text-lg font-medium leading-tight text-gray-600">
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
        <Radio {...register(name)} value="1" />
        <Radio {...register(name)} value="2" />
        <Radio {...register(name)} value="3" />
        <Radio {...register(name)} value="4" />
        <Radio {...register(name)} value="5" />
        <Radio {...register(name)} value="6" />
        <Radio {...register(name)} value="7" />
      </div>
    </td>
  );
}

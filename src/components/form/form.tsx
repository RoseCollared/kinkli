"use client";

import { decodeValues } from "@kinklist/utils";
import { useSearchParams } from "next/navigation";
import { FormHTMLAttributes, Fragment, forwardRef, useMemo } from "react";
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
        className="relative mx-4 columns-1 gap-x-4 py-12 xl:columns-2 min-[1688px]:columns-3"
        {...props}
      >
        <Button
          onClick={() => {
            if (confirm("Are you sure you want to clear all your answers?")) {
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
      .filter(Boolean)
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
    <section className="mb-4 break-inside-avoid-column rounded-xl border-2 border-rose-300 bg-white px-2.5 py-4 shadow-xl shadow-rose-100 xs:p-6 lg:p-4">
      <h2 className="text-2xl font-semibold drop-shadow-sm xs:text-3xl lg:text-2xl">
        {label}
      </h2>
      <table className="block border-separate border-spacing-x-4 border-spacing-y-2 lg:-mx-4 lg:-my-2 lg:table">
        <thead
          className="hidden lg:table-header-group"
          aria-hidden={subquestionLabels.length <= 1}
        >
          {/* This row is rendered even when we don't render subquestion labels because it makes the spacing look good */}
          <tr>
            <th aria-hidden />
            {subquestionLabels.length > 1 &&
              subquestionLabels.map((label) => (
                <th key={label} className="text-lg font-medium text-gray-600">
                  {label}
                </th>
              ))}
          </tr>
        </thead>
        <tbody className="mt-4 flex flex-col gap-8 sm:gap-4 lg:table-row-group">
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
    <tr className="grid grid-cols-1 items-center gap-x-4 gap-y-2 sm:grid-cols-2 lg:table-row">
      {/* Question label only shown above lg*/}
      <td
        aria-hidden
        className="hidden text-lg font-medium leading-tight text-gray-600 lg:table-cell lg:w-40"
      >
        {label}
      </td>
      {subquestions.map((subquestion) => (
        <Fragment key={subquestion.id}>
          {/* Question and subquestion label only shown below lg */}
          <td
            id={`label:${sectionId}.${questionId}.${subquestion.id}`}
            aria-hidden
            className="block text-xl font-medium leading-tight text-gray-600 lg:hidden"
          >
            <span>{label}</span>
            {subquestions.length > 1 && <span> ({subquestion.label})</span>}
          </td>
          <Subquestion
            subquestionId={subquestion.id}
            questionId={questionId}
            sectionId={sectionId}
          />
        </Fragment>
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
    <td className="block lg:table-cell">
      <fieldset
        className="flex gap-2 lg:gap-1"
        aria-labelledby={`label:${name}`}
      >
        <Radio {...register(name)} value="7" />
        <Radio {...register(name)} value="6" />
        <Radio {...register(name)} value="5" />
        <Radio {...register(name)} value="4" />
        <Radio {...register(name)} value="3" />
        <Radio {...register(name)} value="2" />
        <Radio {...register(name)} value="1" />
      </fieldset>
    </td>
  );
}

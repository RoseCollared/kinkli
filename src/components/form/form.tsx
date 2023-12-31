"use client";

import { decodeValues } from "@kinkli/utils";
import { useSearchParams } from "next/navigation";
import { FormHTMLAttributes, Fragment, forwardRef, useMemo } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import kinks from "../../../public/kinks.json";
import { Button } from "../button";
import { Radio } from "../radio";
import { Section } from "../section";
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
  const searchParams = useSearchParams();

  const parsedKinks = useMemo(() => kinksSchema.parse(kinks), []);

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

  useSaveAnswers(methods.control, getEmptyDefaultValues(parsedKinks));

  return (
    <FormProvider {...methods}>
      <form
        ref={ref}
        className="relative mx-4 columns-1 py-12 xl:columns-2 3xl:columns-3"
        {...props}
      >
        <Button
          onClick={() => {
            if (confirm("Are you sure you want to clear all your answers?")) {
              methods.reset(getEmptyDefaultValues(parsedKinks));
            }
          }}
          type="button"
          variant="tertiary"
          className="absolute right-0 top-0 px-3 py-2 text-base sm:px-3 sm:text-base"
        >
          Clear all
        </Button>
        {parsedKinks.sections.map((section) => (
          <FormSection
            key={section.id}
            sectionId={section.id}
            label={section.label}
            questions={section.questions}
            subquestions={section.subquestions}
          />
        ))}
      </form>
    </FormProvider>
  );
});

Form.displayName = "Form";

interface FormSectionProps {
  sectionId: TSection["id"];
  label: TSection["label"];
  questions: TSection["questions"];
  subquestions: TSection["subquestions"];
}
function FormSection(props: FormSectionProps) {
  const { sectionId, label, questions, subquestions } = props;
  const shouldRenderSubquestions = subquestions.length > 1;

  return (
    <Section>
      <Section.Title>{label}</Section.Title>
      <table className="block border-separate border-spacing-x-4 border-spacing-y-2 lg:-mx-4 lg:-my-2 lg:table">
        <thead
          className="hidden lg:table-header-group"
          aria-hidden={!shouldRenderSubquestions}
        >
          {/* This row is rendered even when we don't render subquestion labels because it makes the spacing look good */}
          <tr>
            <th aria-hidden />
            {shouldRenderSubquestions &&
              subquestions.map((subquestion) => (
                <th key={subquestion.id} className="text-lg font-medium">
                  {subquestion.label}
                </th>
              ))}
          </tr>
        </thead>
        <tbody className="mt-4 flex flex-col gap-8 sm:gap-4 lg:table-row-group">
          {questions.map((question) => (
            <FormQuestion
              key={question.id}
              questionId={question.id}
              sectionId={sectionId}
              label={question.label}
              subquestions={subquestions}
            />
          ))}
        </tbody>
      </table>
    </Section>
  );
}

interface FormQuestionProps {
  questionId: TQuestion["id"];
  sectionId: TSection["id"];
  label: TQuestion["label"];
  subquestions: TSection["subquestions"];
}
function FormQuestion(props: FormQuestionProps) {
  const { questionId, sectionId, label, subquestions } = props;
  return (
    <tr className="grid grid-cols-1 items-center gap-x-4 gap-y-2 sm:grid-cols-2 lg:table-row">
      {/* Question label only shown above lg*/}
      <td
        aria-hidden
        className="hidden w-40 text-lg font-medium leading-tight lg:table-cell"
      >
        {label}
      </td>
      {subquestions.map((subquestion) => (
        <Fragment key={subquestion.id}>
          {/* Question and subquestion label only shown below lg */}
          <td
            id={`label:${sectionId}.${questionId}.${subquestion.id}`}
            aria-hidden
            className="block text-xl font-medium leading-tight lg:hidden"
          >
            <span>{label}</span>
            {subquestions.length > 1 && <span> ({subquestion.label})</span>}
          </td>
          <FormSubquestion
            subquestionId={subquestion.id}
            questionId={questionId}
            sectionId={sectionId}
          />
        </Fragment>
      ))}
    </tr>
  );
}

interface FormSubquestionProps {
  subquestionId: TSubquestion["id"];
  questionId: TQuestion["id"];
  sectionId: TSection["id"];
}
function FormSubquestion(props: FormSubquestionProps) {
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

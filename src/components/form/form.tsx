"use client";

import {
  getEmptyDefaultValues,
  type FormValues,
} from "@kinklist/components/form/schema";
import { decodeValues, encodeValues } from "@kinklist/utils";
import { useSearchParams } from "next/navigation";
import { FormHTMLAttributes, forwardRef } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import kinks from "../../../public/kinks-small.json";
import { Radio } from "../radio";

export const Form = forwardRef<
  HTMLFormElement,
  FormHTMLAttributes<HTMLFormElement>
>((props, ref) => {
  const searchParams = useSearchParams();

  const methods = useForm<FormValues>({
    defaultValues: async () => {
      const encodedValues = searchParams.get("answers");
      if (encodedValues) {
        const shape = getEmptyDefaultValues(kinks);
        return decodeValues(encodedValues, shape);
      } else {
        return getEmptyDefaultValues(kinks);
      }
    },
  });

  methods.watch((values) => {
    console.log("watch", values);
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
        className="flex w-full flex-col flex-wrap gap-8 overflow-auto px-8 py-12 sm:max-h-[3200px] sm:px-12 sm:py-16"
        {...props}
      >
        {kinks.sections.map((section) => (
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

function Section({ sectionId, label, questions }) {
  return (
    <section className="flex flex-col gap-4 rounded-xl border-2 border-rose-300 bg-white p-6 shadow-xl shadow-rose-100">
      <h2 className="text-2xl font-semibold drop-shadow-sm sm:text-2xl lg:text-3xl">
        {label}
      </h2>
      {/* TODO: subquestion headings */}
      <div className="flex flex-col gap-6">
        {questions.map((question) => (
          <Question
            key={question.id}
            questionId={question.id}
            sectionId={sectionId}
            label={question.label}
            subquestions={question.subquestions}
          />
        ))}
      </div>
    </section>
  );
}

function Question({ questionId, sectionId, label, subquestions }) {
  return (
    <div className="flex gap-8">
      <div className="mb-4 w-32 text-lg font-medium leading-tight text-gray-600">
        {label}
      </div>
      <div className="flex gap-8">
        {subquestions.map((subquestion) => (
          <Subquestion
            key={subquestion.id}
            subquestionId={subquestion.id}
            questionId={questionId}
            sectionId={sectionId}
          />
        ))}
      </div>
    </div>
  );
}

function Subquestion({ subquestionId, questionId, sectionId }) {
  const { register } = useFormContext();
  const name = `${sectionId}.${questionId}.${subquestionId}`;

  return (
    <div className="flex gap-1">
      <Radio {...register(name)} value="1" />
      <Radio {...register(name)} value="2" />
      <Radio {...register(name)} value="3" />
      <Radio {...register(name)} value="4" />
      <Radio {...register(name)} value="5" />
      <Radio {...register(name)} value="6" />
      <Radio {...register(name)} value="7" />
    </div>
  );
}

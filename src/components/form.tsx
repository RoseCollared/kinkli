"use client";

import kinks from "@kinklist/public/kinks.json";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FormHTMLAttributes, forwardRef } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { Radio } from "./radio";
import { sanitizeInputName } from "@kinklist/utils";

type FieldValues = {
  [sectionName: string]: {
    [questionName: string]: string;
  };
};

export const Form = forwardRef<
  HTMLFormElement,
  FormHTMLAttributes<HTMLFormElement>
>((props, ref) => {
  const searchParams = useSearchParams();

  const methods = useForm<FieldValues>();

  methods.watch((sections) => {
    // Transform all form values to a flat array
    const flatValues = Object.values(sections || {}).flatMap((questions) =>
      Object.values(questions || {})
    );

    if (flatValues.find((answer) => answer !== null)) {
      const encodedAnswers = flatValues
        .map((value) => (value === null ? "0" : value))
        .join("");
      const params = new URLSearchParams(searchParams.toString());
      params.set("answers", encodedAnswers);
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
        {Object.entries(kinks).map(([sectionName, questions]) => (
          <Section
            key={sectionName}
            sectionName={sectionName}
            questions={questions}
          />
        ))}
      </form>
    </FormProvider>
  );
});
Form.displayName = "Form";

function Section({ sectionName, questions }) {
  return (
    <section className="flex flex-col gap-4 rounded-xl border-2 border-rose-300 bg-white p-6 shadow-xl shadow-rose-100">
      <h2 className="text-2xl font-semibold drop-shadow-sm sm:text-2xl lg:text-3xl">
        {sectionName}
      </h2>
      <div className="flex flex-col gap-6">
        {Object.keys(questions).map((questionName) => (
          <Question
            key={questionName}
            questionName={questionName}
            sectionName={sectionName}
          />
        ))}
      </div>
    </section>
  );
}

function Question({ questionName, sectionName }) {
  const { register } = useFormContext();
  const name = `${sanitizeInputName(sectionName)}.${sanitizeInputName(
    questionName
  )}`;

  return (
    <fieldset>
      <legend className="mb-4 text-lg font-medium leading-tight text-gray-600">
        {questionName}
      </legend>
      <div className="flex gap-4">
        <Radio {...register(name)} value="1" />
        <Radio {...register(name)} value="2" />
        <Radio {...register(name)} value="3" />
        <Radio {...register(name)} value="4" />
        <Radio {...register(name)} value="5" />
      </div>
    </fieldset>
  );
}

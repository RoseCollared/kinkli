"use client";

import kinks from "@/public/kinks.json";
import { forwardRef } from "react";
import { Radio } from "./radio";

export const Form = forwardRef<HTMLFormElement>((props, ref) => {
  return (
    <form
      ref={ref}
      className="flex w-full flex-col flex-wrap gap-8 overflow-auto px-8 py-12 sm:max-h-[3200px] sm:px-12 sm:py-16"
    >
      {Object.entries(kinks).map(([sectionName, questions]) => (
        <Section
          key={sectionName}
          sectionName={sectionName}
          questions={questions}
        />
      ))}
    </form>
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
          <Question key={questionName} questionName={questionName} />
        ))}
      </div>
    </section>
  );
}

function Question({ questionName }) {
  return (
    <fieldset>
      <legend className="mb-4 text-lg font-medium leading-tight text-gray-600">
        {questionName}
      </legend>
      <div className="flex gap-4">
        <Radio name={questionName} />
        <Radio name={questionName} />
        <Radio name={questionName} />
        <Radio name={questionName} />
        <Radio name={questionName} />
      </div>
    </fieldset>
  );
}

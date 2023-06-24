import { InputHTMLAttributes } from "react";
import kinks from "../public/kinks.json";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-12 py-12 sm:py-16">
      <h1 className="text-4xl font-bold drop-shadow-sm sm:text-5xl">
        Kinklist
      </h1>
      <form className="flex w-full flex-col flex-wrap gap-8 overflow-auto px-8 sm:max-h-[3000px] sm:px-12">
        {Object.entries(kinks).map(([sectionName, questions]) => (
          <Section
            key={sectionName}
            sectionName={sectionName}
            questions={questions}
          />
        ))}
      </form>
    </main>
  );
}

function Section({ sectionName, questions }) {
  return (
    <section className="flex flex-col gap-4 rounded-xl border-2 border-rose-300 p-6 shadow-xl shadow-rose-100">
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

function Radio(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type="radio"
      className="relative h-5 w-5 appearance-none rounded-full border-2 border-gray-400 before:absolute before:inset-0.5 before:rounded-full before:bg-rose-400 before:opacity-0 before:transition-opacity checked:before:opacity-100 hover:before:opacity-70 checked:hover:before:opacity-100"
      {...props}
    />
  );
}

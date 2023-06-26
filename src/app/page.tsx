"use client";
import {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  useRef,
  useState,
} from "react";
import kinks from "../public/kinks.json";
import { twMerge } from "tailwind-merge";
import html2canvas from "html2canvas";
import { useResultStore } from "./store";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const formRef = useRef<HTMLFormElement>(null);
  const setResult = useResultStore((state) => state.setResult);
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col items-center gap-12 py-12 sm:py-16">
      <header className="flex w-full justify-between gap-8 px-12">
        <div />
        <h1 className="text-4xl font-bold drop-shadow-sm sm:text-5xl">
          Kinklist
        </h1>
        <Button
          onClick={async () => {
            if (!formRef.current) {
              throw new Error("Failed to get form element for export");
            }
            // LEFT HERE
            // TODO: set width/height options to ensure whole form is captured
            // TODO: store JSON result in state rather than image
            // TODO: store JSON result in URL
            const canvas = await html2canvas(formRef.current);
            const base64image = canvas.toDataURL("image/png");
            setResult(base64image);
            router.push("/result");
          }}
        >
          Export
        </Button>
      </header>
      <form
        ref={formRef}
        className="flex w-full flex-col flex-wrap gap-8 overflow-auto px-8 sm:max-h-[3200px] sm:px-12"
      >
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

function Radio(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type="radio"
      className="relative h-5 w-5 appearance-none rounded-full border-2 border-gray-400 before:absolute before:inset-0.5 before:rounded-full before:bg-rose-400 before:opacity-0 before:transition-opacity checked:before:opacity-100 hover:before:opacity-70 checked:hover:before:opacity-100"
      {...props}
    />
  );
}

function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      {...props}
      className={twMerge(
        "rounded-lg bg-rose-500 px-6 py-3 text-xl font-semibold text-white shadow transition-colors hover:bg-rose-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-300 active:bg-rose-700",
        props.className
      )}
    />
  );
}

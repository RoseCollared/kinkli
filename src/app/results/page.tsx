"use client";

import { getEmptyDefaultValues } from "@kinklist/components/form/default-values";
import {
  kinksSchema,
  type FormValues,
  type TQuestion,
  type TSection,
} from "@kinklist/components/form/schema";
import { Radio } from "@kinklist/components/radio";
import { Section } from "@kinklist/components/section";
import { decodeValues } from "@kinklist/utils";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import kinks from "../../../public/kinks.json";

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const parsedKinks = useMemo(() => kinksSchema.parse(kinks), []);

  // Decode answers from search param
  const answers = useMemo(() => {
    const encodedValues = searchParams.get("answers");
    if (encodedValues) {
      const shape = getEmptyDefaultValues(parsedKinks);
      return decodeValues(encodedValues, shape);
    } else {
      return undefined;
    }
  }, [searchParams, parsedKinks]);

  if (!answers) return null;

  return (
    <div className="relative mx-4 columns-1 py-12 sm:columns-2 lg:columns-3 xl:columns-4 2xl:columns-5 4xl:columns-6">
      {parsedKinks.sections.map((section) => (
        <ResultsSection
          key={section.id}
          sectionId={section.id}
          label={section.label}
          questions={section.questions}
          answers={answers}
        />
      ))}
    </div>
  );
}

interface ResultsSectionProps {
  sectionId: TSection["id"];
  label: TSection["label"];
  questions: TSection["questions"];
  answers: FormValues;
}
function ResultsSection(props: ResultsSectionProps) {
  const { sectionId, label, questions, answers } = props;

  // TODO: move subquestions to section level?
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
    <Section>
      <Section.Title>{label}</Section.Title>
      {subquestionLabels.length > 1 && (
        <p className="text-lg italic text-gray-600 lg:text-base">
          {subquestionLabels.join(", ")}
        </p>
      )}
      <table className="-mx-2 -my-2 border-separate border-spacing-x-2 border-spacing-y-2 lg:-mx-1 lg:border-spacing-x-1">
        <thead aria-hidden={subquestionLabels.length <= 1}>
          {/* The table head only exists for accessiblity, we don't render any visible headings */}
          <tr>
            <th aria-hidden />
            {subquestionLabels.length > 1 &&
              subquestionLabels.map((label) => (
                <th key={label} className="sr-only">
                  {label}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {questions.map((question) => (
            <ResultsQuestion
              key={question.id}
              questionId={question.id}
              sectionId={sectionId}
              label={question.label}
              subquestions={question.subquestions}
              answers={answers}
            />
          ))}
        </tbody>
      </table>
    </Section>
  );
}

interface ResultsQuestionProps {
  questionId: TQuestion["id"];
  sectionId: TSection["id"];
  label: TQuestion["label"];
  subquestions: TQuestion["subquestions"];
  answers: FormValues;
}
function ResultsQuestion(props: ResultsQuestionProps) {
  const { questionId, sectionId, label, subquestions, answers } = props;

  return (
    <tr>
      {subquestions.map((subquestion) => (
        // px-0 to match the horizontal spacing between radio buttons in the form
        <td key={subquestion.id} className="px-0">
          <Radio
            checked={!!answers[sectionId][questionId][subquestion.id]} // don't check if not answered
            value={answers[sectionId][questionId][subquestion.id] ?? "0"}
            readOnly
            className="block" // to prevent adding space for descenders
          />
        </td>
      ))}
      <td className="sm:w-54 pl-3 text-xl leading-tight text-gray-600 lg:pl-2 lg:text-lg">
        {label}
      </td>
    </tr>
  );
}
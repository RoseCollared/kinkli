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
    <div>
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
        <p className="italic text-gray-600">{subquestionLabels.join(", ")}</p>
      )}
      <table className="border-separate border-spacing-x-4 border-spacing-y-2 lg:-mx-4 lg:-my-2">
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
    <tr className="flex">
      <td className="w-40">{label}</td>
      {subquestions.map((subquestion) => (
        <td key={subquestion.id}>
          <Radio
            checked
            value={answers[sectionId][questionId][subquestion.id] ?? "0"}
            readOnly
          />
        </td>
      ))}
    </tr>
  );
}

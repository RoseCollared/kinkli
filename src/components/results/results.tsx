"use client";

import { Button } from "@kinkli/components/button";
import { getEmptyValues } from "@kinkli/components/form/default-values";
import {
  kinksSchema,
  type FormValues,
  type TQuestion,
  type TSection,
} from "@kinkli/components/form/schema";
import { Radio } from "@kinkli/components/radio";
import { Section } from "@kinkli/components/section";
import { useIsExport } from "@kinkli/context/export-context";
import { decodeValues } from "@kinkli/utils";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ForwardedRef, forwardRef, useMemo } from "react";
import { twMerge } from "tailwind-merge";
import kinks from "../../../public/kinks.json";

function _Results(
  { className }: { className?: string },
  ref: ForwardedRef<HTMLDivElement>
) {
  const isExport = useIsExport();
  const searchParams = useSearchParams();
  const parsedKinks = useMemo(() => kinksSchema.parse(kinks), []);

  // Decode answers from search param
  const answers = useMemo(() => {
    const encodedValues = searchParams.get("answers");
    if (encodedValues) {
      const shape = getEmptyValues(parsedKinks);
      return decodeValues(encodedValues, shape);
    } else {
      return getEmptyValues(parsedKinks);
    }
  }, [searchParams, parsedKinks]);

  if (!answers) return null;

  return (
    <div
      ref={ref}
      className={twMerge(
        "relative columns-1 sm:columns-2 lg:columns-3 xl:columns-4 2xl:columns-5 4xl:columns-6",
        !isExport && "pt-12",
        className
      )}
    >
      {!isExport && (
        <Link
          href={{ pathname: "/", search: searchParams.toString() }}
          className="absolute right-0 top-0"
          tabIndex={-1}
        >
          <Button
            variant="tertiary"
            className="px-3 py-2 text-base sm:px-3 sm:text-base"
          >
            Edit answers
          </Button>
        </Link>
      )}
      {parsedKinks.sections.map((section) => (
        <ResultsSection
          key={section.id}
          sectionId={section.id}
          label={section.label}
          questions={section.questions}
          subquestions={section.subquestions}
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
  subquestions: TSection["subquestions"];
  answers: FormValues;
}
function ResultsSection(props: ResultsSectionProps) {
  const { sectionId, label, questions, subquestions, answers } = props;
  const shouldRenderSubquestions = subquestions.length > 1;

  return (
    <Section className="mb-4 break-inside-avoid-column">
      <Section.Title>{label}</Section.Title>
      {shouldRenderSubquestions && (
        <p className="text-lg italic lg:text-base">
          {subquestions.map(({ label }) => label).join(", ")}
        </p>
      )}
      <table className="-mx-2 -my-2 border-separate border-spacing-x-2 border-spacing-y-2 lg:-mx-1 lg:border-spacing-x-1">
        <thead aria-hidden={!shouldRenderSubquestions}>
          {/* The table head only exists for accessiblity, we don't render any visible headings */}
          <tr>
            <th aria-hidden />
            {shouldRenderSubquestions &&
              subquestions.map((subquestion) => (
                <th key={subquestion.id} className="sr-only">
                  {subquestion.label}
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
              subquestions={subquestions}
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
  subquestions: TSection["subquestions"];
  answers: FormValues;
}
function ResultsQuestion(props: ResultsQuestionProps) {
  const { questionId, sectionId, label, subquestions, answers } = props;
  const isExport = useIsExport();

  return (
    <tr>
      {subquestions.map((subquestion) => (
        // px-0 to match the horizontal spacing between radio buttons in the form
        <td key={subquestion.id} className="px-0">
          <Radio
            checked={!!answers[sectionId][questionId][subquestion.id]} // don't check if not answered
            value={String(answers[sectionId][questionId][subquestion.id] ?? 0)}
            alwaysSmall={isExport} // export always renders a large image, so use the small variant
            readOnly
            className="block" // to prevent adding space for descenders
          />
        </td>
      ))}
      <td className="sm:w-54 pl-3 text-xl font-medium leading-tight lg:pl-2 lg:text-lg">
        {label}
      </td>
    </tr>
  );
}

export const Results = forwardRef(_Results);

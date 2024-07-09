"use client";
import { twMerge } from "tailwind-merge";
import { TKinks } from "./form/schema";
import { useAnswers } from "./form/use-answers";
import { Link } from "./link";
import { Section } from "./section";

export function TableOfContents({
  kinks,
  className,
}: {
  kinks: TKinks;
  className?: string;
}) {
  const answers = useAnswers(kinks);

  // return <pre>{JSON.stringify(answers, null, 2)}</pre>

  return (
    <Section className={twMerge("flex flex-col gap-2 font-medium", className)}>
      <Section.Title>Overview</Section.Title>
      <ul>
        {kinks.sections.map((section) => (
          <li key={section.id}>
            <Link href={{ hash: section.id }}>{section.label}</Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}

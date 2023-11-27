import { twMerge } from "tailwind-merge";
import { TKinks } from "./form/schema";
import { Link } from "./link";
import { Section } from "./section";

export function TableOfContents({
  kinks,
  className,
}: {
  kinks: TKinks;
  className?: string;
}) {
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

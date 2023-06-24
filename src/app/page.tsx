import kinks from "../public/kinks.json";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-12 p-24">
      <h1 className="text-5xl font-semibold">Kinklist</h1>
      <form className="flex flex-col flex-wrap gap-8">
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
    <section className="flex flex-col gap-4">
      <h2 className="text-3xl font-medium">{sectionName}</h2>
      {Object.keys(questions).map((questionName) => (
        <Question key={questionName} questionName={questionName} />
      ))}
    </section>
  );
}

function Question({ questionName }) {
  return (
    <fieldset>
      <legend className="mb-2">{questionName}</legend>
      <div className="flex space-x-4">
        <input type="radio" name={questionName} />
        <input type="radio" name={questionName} />
        <input type="radio" name={questionName} />
        <input type="radio" name={questionName} />
        <input type="radio" name={questionName} />
      </div>
    </fieldset>
  );
}

export function Section({ children }) {
  return (
    <section className="mb-4 break-inside-avoid-column rounded-xl border-2 border-rose-300 bg-white px-2.5 py-4 shadow-xl shadow-rose-100 xs:p-6 lg:p-4">
      {children}
    </section>
  );
}

function SectionTitle({ children }) {
  return (
    <h2 className="text-2xl font-semibold drop-shadow-sm xs:text-3xl lg:text-2xl">
      {children}
    </h2>
  );
}

Section.Title = SectionTitle;

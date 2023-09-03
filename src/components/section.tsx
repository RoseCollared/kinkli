export function Section({ children }) {
  return (
    <section className="mb-4 break-inside-avoid-column rounded-xl border-2 border-rose-300 bg-white px-2.5 py-4 text-gray-600 shadow-xl shadow-rose-100 dark:border-red-700 dark:bg-zinc-900 dark:text-gray-200 dark:shadow-red-950 xs:p-6 lg:p-4">
      {children}
    </section>
  );
}

function SectionTitle({ children }) {
  return (
    <h2 className="text-2xl font-semibold text-gray-800 drop-shadow-sm dark:text-gray-100 xs:text-3xl lg:text-2xl">
      {children}
    </h2>
  );
}

Section.Title = SectionTitle;

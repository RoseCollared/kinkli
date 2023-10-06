import { Results } from "@kinkli/components/results/results";
import { getKinks } from "@kinkli/kinks";

export default function ResultsPage() {
  const kinks = getKinks();
  return <Results kinks={kinks} className="py-12" />;
}

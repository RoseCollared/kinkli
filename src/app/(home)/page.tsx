import { Form } from "@kinkli/components/form/form";
import { getKinks } from "@kinkli/kinks";

export default function HomePage() {
  const kinks = getKinks();
  return <Form kinks={kinks} />;
}

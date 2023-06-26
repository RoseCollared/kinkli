"use client"
import { useResultStore } from "../store";

export default function ResultPage() {
  const result = useResultStore((state) => state.result);

  if (result) {
    return <img alt="kinklist result" src={result} />;
  } else {
    return <div>Oops!</div>;
  }
}

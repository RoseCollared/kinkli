"use client";

import { Button } from "@/components/button";
import { Form } from "@/components/form";
import html2canvas from "html2canvas";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { useResultStore } from "./store";

export default function HomePage() {
  const formRef = useRef<HTMLFormElement>(null);
  const setResult = useResultStore((state) => state.setResult);
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col items-center">
      <header className="flex w-full justify-between gap-8 px-12 pt-12 sm:pt-16">
        <div />
        <h1 className="text-4xl font-bold drop-shadow-sm sm:text-5xl">
          Kinklist
        </h1>
        <Button
          onClick={async () => {
            if (!formRef.current) {
              throw new Error("Failed to get form element for export");
            }
            // TODO: store JSON result in state rather than image
            // TODO: store JSON result in URL
            const canvas = await html2canvas(formRef.current, {
              windowWidth: 1920,
            });
            const base64image = canvas.toDataURL("image/png");
            setResult(base64image);
            router.push("/result");
          }}
        >
          Export
        </Button>
      </header>
      <Form ref={formRef} />
    </main>
  );
}

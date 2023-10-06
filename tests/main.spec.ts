import { expect, test } from "@playwright/test";
import { labelMap } from "../src/answer-labels";

test("has title", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText(/Kinkli/i)).toBeVisible();
});

test("persists answers after a page reload", async ({ page }) => {
  await page.goto("/");

  // Answer all (sub)questions in repeating pattern 7654321 7654321...
  let nextAnswer = 7;
  for (const section of await page.getByRole("region").all()) {
    for (const subquestion of await section.getByRole("radiogroup").all()) {
      const beforeUrl = page.url();

      const radio = subquestion.getByRole("radio", {
        name: labelMap.get(String(nextAnswer)),
      });
      await radio.click();
      expect(radio).toBeChecked();

      // Wait for URL to change because answers are stored in search params.
      // If we don't do this we might reload the page before an answer is
      // persisted.
      await page.waitForURL((url) => url.toString() !== beforeUrl);

      if (nextAnswer > 1) {
        nextAnswer--;
      } else {
        nextAnswer = 7;
      }
    }
  }

  await page.reload();

  // Expect the (sub)questions to be checked in the same pattern
  nextAnswer = 7;
  for (const section of await page.getByRole("region").all()) {
    for (const subquestion of await section.getByRole("radiogroup").all()) {
      const radio = subquestion.getByRole("radio", {
        name: labelMap.get(String(nextAnswer)),
      });
      await expect(radio).toBeChecked();

      if (nextAnswer > 1) {
        nextAnswer--;
      } else {
        nextAnswer = 7;
      }
    }
  }
});

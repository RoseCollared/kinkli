import { BiMoon, BiSun } from "react-icons/bi";
import { Button } from "./button";

export function DarkModeButton() {
  const isDark = true;
  return (
    <Button
      icon={
        isDark ? <BiSun className="h-8 w-8" /> : <BiMoon className="h-8 w-8" />
      }
      variant="tertiary"
      className="p-1 sm:p-1"
    />
  );
}

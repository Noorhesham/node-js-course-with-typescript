"use client";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
export function ThemeSwitcher() {
  const { setTheme, theme } = useTheme();

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="dark-mode-toggle"
        checked={theme === "dark"}
        onCheckedChange={() => setTheme(theme === "dark" ? "light" : "dark")}
      />{" "}
    </div>
  );
}

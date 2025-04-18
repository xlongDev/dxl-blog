"use client";

import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      themes={[
        "light",
        "dark",
        "green",
        "purple",
        "orange",
        "blue",
        "pink",
        "brown",
      ]}
      forcedTheme={undefined}
      value={{
        light: "light",
        dark: "dark",
        green: "theme-green",
        purple: "theme-purple",
        orange: "theme-orange",
        blue: "theme-blue",
        pink: "theme-pink",
        brown: "theme-brown",
      }}
    >
      {children}
    </ThemeProvider>
  );
}

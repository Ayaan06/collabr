"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ReactNode, ComponentProps } from "react";

type ThemeProviderProps = {
  children: ReactNode;
} & ComponentProps<typeof NextThemesProvider>;

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props} defaultTheme="dark" storageKey="buildup-theme">
      {children}
    </NextThemesProvider>
  );
}

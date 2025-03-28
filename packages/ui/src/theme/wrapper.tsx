"use client";

import { cn } from "@workspace/ui/lib/utils";
import { useThemeConfig } from "@workspace/ui/hooks/use-theme-config";

interface ThemeWrapperProps {
  defaultTheme?: string;
  children: React.ReactNode;
  className?: string;
}

export function Wrapper({
  defaultTheme,
  children,
  className,
}: ThemeWrapperProps) {
  const [config] = useThemeConfig();

  return (
    <div
      suppressHydrationWarning
      className={cn(
        `theme-${defaultTheme || config.theme}`,
        "w-full",
        className,
      )}
      style={
        {
          "--radius": `${defaultTheme ? 0.5 : config.radius}rem`,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}

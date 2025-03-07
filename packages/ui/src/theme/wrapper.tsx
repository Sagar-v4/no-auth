"use client";

import { useIsMounted } from "usehooks-ts";

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

  return useIsMounted() ? (
    <div
      suppressContentEditableWarning
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
  ) : (
    children
  );
}

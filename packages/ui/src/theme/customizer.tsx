"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { useIsMounted } from "usehooks-ts";
import { Check, Palette, RefreshCw } from "lucide-react";

// import "../styles/mdx.css";
import {
  baseColors,
  Modes,
  modes,
  Radius,
  radius,
} from "@workspace/ui/registry";
import { cn } from "@workspace/ui/lib/utils";
import { Wrapper as ThemeWrapper } from "@workspace/ui/theme/wrapper";
import { ResponsiveDialog } from "@workspace/ui/components/responsive-dialog";
import { Button } from "@workspace/ui/components/button";
import { Label } from "@workspace/ui/components/label";
import { useThemeConfig } from "@workspace/ui/hooks/use-theme-config";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip";

export function ThemeCustomizer() {
  const title = "Customize theme";
  const description = "";
  const trigger = (
    <Button
      variant="ghost"
      className="w-full group-data-[collapsible=icon]:hidden"
    >
      <Palette />
      Customize
    </Button>
  );

  return (
    <ResponsiveDialog title={title} description={description} trigger={trigger}>
      <Customizer />
    </ResponsiveDialog>
  );
}

function Customizer() {
  const { setTheme: setMode, resolvedTheme, theme: mode } = useTheme();
  const [config, setConfig] = useThemeConfig();
  if (!useIsMounted()) return null;

  return (
    <ThemeWrapper className="flex flex-col">
      <div className="flex items-start pt-2 md:pt-4">
        <div className="grid gap-1">
          <div className="leading-none font-semibold tracking-tight">
            Theme Customizer
          </div>
          <div className="text-muted-foreground text-xs">
            Customize your components colors.
          </div>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="default"
                size="icon"
                className="ml-auto"
                onClick={() => {
                  setConfig({
                    ...config,
                    theme: "zinc",
                    radius: 0.5,
                  });
                  setMode("system");
                }}
              >
                <RefreshCw className="size-4" />
                <span className="sr-only">Reset theme</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Reset theme</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="flex flex-col pt-4 md:pt-6">
        <div className="py-1.5">
          <Label className="text-xs">Color</Label>
          <div className="flex gap-2 pt-1">
            {baseColors
              .filter(
                (theme) =>
                  ![
                    "slate",
                    "stone",
                    "gray",
                    "neutral",
                    "violet",
                    "blue",
                    "red",
                    "zinc",
                  ].includes(theme.name),
              )
              .map((theme) => {
                const isActive = config.theme === theme.name;

                return (
                  <Button
                    variant={"outline"}
                    size="sm"
                    key={theme.name}
                    onClick={() => {
                      setConfig({
                        ...config,
                        theme: theme.name,
                      });
                    }}
                    className={cn(
                      "w-full justify-center",
                      isActive && "border-primary border-2",
                    )}
                    style={
                      {
                        "--theme-primary": `hsl(${
                          theme?.activeColor[
                            resolvedTheme === "dark" ? "dark" : "light"
                          ]
                        })`,
                      } as React.CSSProperties
                    }
                  >
                    <span
                      className={cn(
                        "mr-1 flex h-5 w-5 shrink-0 -translate-x-1 items-center justify-center rounded-full bg-[--theme-primary]",
                      )}
                    >
                      {isActive && <Check className="size-4 text-white" />}
                    </span>
                    {theme.label}
                  </Button>
                );
              })}
          </div>
        </div>
        <div className="py-1.5">
          <Label className="text-xs">Radius</Label>
          <div className="flex gap-2 pt-1">
            {radius.map((value: Radius) => {
              return (
                <Button
                  variant={"outline"}
                  size="sm"
                  key={value}
                  onClick={() => {
                    setConfig({
                      ...config,
                      radius: value,
                    });
                  }}
                  className={cn(
                    "w-full",
                    config.radius === value && "border-primary border-2",
                  )}
                >
                  {value}
                </Button>
              );
            })}
          </div>
        </div>
        <div className="py-1.5">
          <Label className="text-xs">Mode</Label>
          <div className="flex gap-2 pt-1">
            {modes.map((themeMode: Modes) => {
              return (
                <Button
                  size="sm"
                  key={themeMode.name}
                  variant={"outline"}
                  onClick={() => {
                    setMode(themeMode.name);
                  }}
                  className={cn(
                    "w-full",
                    mode === themeMode.name && "border-primary border-2",
                  )}
                >
                  <themeMode.icon className="mr-1 size-4 -translate-x-1" />
                  {themeMode.label}
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </ThemeWrapper>
  );
}

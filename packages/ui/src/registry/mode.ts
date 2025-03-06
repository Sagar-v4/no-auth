import { Monitor, Sun, Moon } from "lucide-react";

export const modes = [
  {
    name: "light",
    label: "Light",
    icon: Sun,
  },
  {
    name: "dark",
    label: "Dark",
    icon: Moon,
  },
  {
    name: "system",
    label: "System",
    icon: Monitor,
  },
] as const;

export type Modes = (typeof modes)[number];

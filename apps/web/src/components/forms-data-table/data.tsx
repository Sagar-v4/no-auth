import {
  ArchiveX,
  CircleCheck,
  SquareAsterisk,
  WandSparkles,
} from "lucide-react";

export const status = [
  {
    label: "Active",
    value: "Active",
    icon: CircleCheck,
  },
  {
    label: "Archived",
    value: "Archived",
    icon: ArchiveX,
  },
];

export const types = [
  {
    label: "OTP",
    value: "OTP",
    icon: SquareAsterisk,
  },
  {
    label: "Magic Link",
    value: "Magic Link",
    icon: WandSparkles,
  },
];

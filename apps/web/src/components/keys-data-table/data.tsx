import { CircleAlert, CircleCheck, CircleX } from "lucide-react";

export const status = [
  {
    label: "Active",
    value: "Active",
    icon: CircleCheck,
  },
  {
    label: "Deactivated",
    value: "Deactivated",
    icon: CircleX,
  },
  {
    label: "Expired",
    value: "Expired",
    icon: CircleAlert,
  },
];

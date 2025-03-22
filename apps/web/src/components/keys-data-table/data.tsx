import { STATUS_ENUM } from "@/lib/trpc/schemas/v1/keys";
import { CircleCheck, CircleX } from "lucide-react";

export const status = [
  {
    label: "Active",
    value: STATUS_ENUM.Enum.ACTIVE,
    icon: CircleCheck,
  },
  {
    label: "Deactive",
    value: STATUS_ENUM.Enum.DEACTIVE,
    icon: CircleX,
  },
];

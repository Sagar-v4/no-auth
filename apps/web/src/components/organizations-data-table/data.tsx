import { STATUS_ENUM } from "@/lib/trpc/schemas/v1/organizations";
import { Archive, MonitorCheck } from "lucide-react";

export const status = [
  {
    label: "Active",
    value: STATUS_ENUM.Enum.ACTIVE,
    icon: MonitorCheck,
  },
  {
    label: "Archive",
    value: STATUS_ENUM.Enum.ARCHIVED,
    icon: Archive,
  },
];

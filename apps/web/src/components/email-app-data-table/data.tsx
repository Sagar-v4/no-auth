import { StatusEnum } from "@/lib/trpc/schemas/v1/users";
import { CircleCheck, CircleX, Mail } from "lucide-react";

export const status = [
  {
    label: "Active",
    value: "Active" as StatusEnum,
    icon: CircleCheck,
  },
  {
    label: "Blocked",
    value: "Blocked" as StatusEnum,
    icon: CircleX,
  },
];

export const types = [
  {
    label: "Node Mailer",
    value: "Node Mailer",
    icon: Mail,
  },
];

"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@workspace/ui/components/checkbox";

import {
  status as statuses,
  types,
} from "@/components/email-app-data-table/data";
import { App } from "@/components/email-app-data-table/schema";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { DataTableRowActions } from "@/components/email-app-data-table/row-actions";
import { EmailAppOutputSchema } from "@/lib/trpc/schemas/v1/email/apps";

export const columns: ColumnDef<EmailAppOutputSchema>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //       className="translate-y-[2px]"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //       className="translate-y-[2px]"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "uuid",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="UUID" className="pl-2" />
    ),
    cell: ({ row }) => (
      <div className="w-[50px] overflow-hidden pl-2 text-nowrap text-ellipsis">
        {row.getValue("uuid")}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("name")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("description")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status"),
      );

      if (!status) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center">
          {status.icon && (
            <status.icon className="text-muted-foreground mr-2 h-4 w-4" />
          )}
          <span>{status.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Types" />
    ),
    cell: ({ row }) => {
      const app_type = types.find(
        (type) => type.value === row.getValue("type"),
      );

      if (!app_type) {
        return null;
      }

      return (
        <div className="flex items-center">
          {app_type.icon && (
            <app_type.icon className="text-muted-foreground mr-2 h-4 w-4" />
          )}
          <span>{app_type.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];

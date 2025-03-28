"use client";

import { ColumnDef } from "@tanstack/react-table";

import { status as statuses } from "@/components/organizations-data-table/data";
import { OrganizationOutput } from "@/lib/trpc/schemas/v1/organizations";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { DataTableRowActions } from "@/components/organizations-data-table/row-actions";

export const columns: ColumnDef<OrganizationOutput>[] = [
  {
    accessorKey: "uuid",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="UUID" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[80px] truncate font-medium">
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
          <span className="max-w-[150px] truncate font-medium">
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
          <span className="max-w-[250px] truncate font-medium">
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
        <div className="flex max-w-[100px] items-center">
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
    id: "actions",
    cell: ({ row }) => (
      <div className="max-w-[30px] items-center">
        <DataTableRowActions row={row} />
      </div>
    ),
  },
];

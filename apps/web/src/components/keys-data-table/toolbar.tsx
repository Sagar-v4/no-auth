"use client";

import { JSX } from "react";
import { Table } from "@tanstack/react-table";
import { X } from "lucide-react";

import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";

import { status } from "@/components/keys-data-table/data";
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options";
import { DataTableFacetedFilter } from "@/components/data-table/data-table-faceted-filter";
import { cn } from "@workspace/ui/lib/utils";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
  Refresh,
  Add,
}: DataTableToolbarProps<TData> & {
  Refresh?: () => JSX.Element;
  Add?: () => JSX.Element;
}) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <span className="flex w-full justify-between gap-x-2 overflow-x-scroll p-1">
      <div className="flex gap-x-2">
        {Refresh ? <Refresh /> : null}
        <Input
          placeholder="Search..."
          value={[table.getColumn("name")?.getFilterValue() as string]}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className={cn("h-8 w-[150px] lg:w-[250px]")}
        />
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={status}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X />
          </Button>
        )}
      </div>
      <div className="flex gap-x-2">
        <DataTableViewOptions table={table} />
        {Add ? <Add /> : null}
      </div>
    </span>
  );
}

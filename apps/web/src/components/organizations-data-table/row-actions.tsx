"use client";

import { Row } from "@tanstack/react-table";
import { ExternalLink, MoreHorizontal } from "lucide-react";

import { Button } from "@workspace/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";

import { status } from "@/components/organizations-data-table/data";
import {
  organizationOutput,
  StatusEnum,
} from "@/lib/trpc/schemas/v1/organizations";
import { Edit } from "@/components/organizations-data-table/edit";
import { Delete } from "@/components/organizations-data-table/delete";
import { updateOrganizationByIdV1 } from "@/trpc/routers/organizations";
import { useOrganization } from "@/hooks/use-organization";
import { useRouter } from "next/navigation";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const { setOrg } = useOrganization();
  const organization = organizationOutput.parse(row.original);
  const { exec: updateOrganization } = updateOrganizationByIdV1();
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="data-[state=open]:bg-muted flex h-8 w-8 p-0"
        >
          <MoreHorizontal />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem
          onClick={() => {
            setOrg(organization.uuid);
            router.push(`/o/dashboard`);
          }}
        >
          Open <ExternalLink />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Edit uuid={organization.uuid} />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Status</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup
              value={organization.status}
              onValueChange={(value) => {
                updateOrganization({
                  filter: { uuid: organization.uuid },
                  update: { status: value as StatusEnum },
                });
              }}
            >
              {status.map((status, idx) => (
                <DropdownMenuRadioItem key={idx} value={status.value}>
                  {status.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Delete uuid={organization.uuid} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

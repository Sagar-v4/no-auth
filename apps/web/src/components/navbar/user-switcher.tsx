"use user";

import * as React from "react";
import Link from "next/link";
import {
  ArrowRightLeft,
  Building,
  ExternalLink,
  RefreshCw,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import { getOrganizationsByDataV1 } from "@/trpc/routers/organizations";
import { useURL } from "@/hooks/use-url";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Avatar, AvatarFallback } from "@workspace/ui/components/avatar";
import { USERS } from "@/registry/sidebar";
import { NO_AUTH_USER_ROLES_ENUM } from "@/lib/trpc/schemas/v1/users";
import { Button } from "@workspace/ui/components/button";
import { Skeleton } from "@workspace/ui/components/skeleton";

export function NavbarUserSwitcher() {
  const { user_type, page_name } = useURL();
  const { user, organization, localUser } = useCurrentUser();

  const { data, isLoading, isError } = getOrganizationsByDataV1({
    filter: [
      {
        user_id: user._id,
      },
    ],
  });

  const Reload = () => {
    return (
      <Button
        size="icon"
        className="bg-destructive hover:bg-destructive rounded-full text-white"
        onClick={() => window.location.reload()}
      >
        <div className="flex aspect-square size-8 items-center justify-center">
          <RefreshCw className="size-4" />
        </div>
      </Button>
    );
  };

  if (isLoading)
    return (
      <Skeleton className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-9 items-center justify-center rounded-full" />
    );
  if (!data || isError) return <Reload />;

  const User = () => {
    return (
      <>
        <Avatar className="size-9 rounded-full">
          <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground rounded-lg">
            {user.name.toUpperCase()[0]}
          </AvatarFallback>
        </Avatar>
      </>
    );
  };

  const Organization = () => {
    return (
      <>
        <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-9 items-center justify-center rounded-full">
          <Building className="size-4" />
        </div>
      </>
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="rounded-full">
        <Button size="icon">
          {user_type === USERS.CLIENT ? <User /> : null}
          {user_type === USERS.ORGANIZATION ? <Organization /> : null}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="mr-2 w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
        align="start"
        side="bottom"
        sideOffset={4}
      >
        <DropdownMenuLabel className="text-muted-foreground text-xs">
          Organizations
        </DropdownMenuLabel>
        <DropdownMenuGroup>
          {data.map((organization) => (
            <Link
              href={
                user_type === USERS.ORGANIZATION
                  ? `/o/${page_name}`
                  : "/o/dashboard"
              }
              key={organization.name}
            >
              <DropdownMenuItem>{organization.name}</DropdownMenuItem>
            </Link>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {user.roles.includes(NO_AUTH_USER_ROLES_ENUM.Enum.ADMIN) && (
            <>
              <DropdownMenuItem>
                <ExternalLink />
                Admin
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          )}
          <DropdownMenuItem>
            <ArrowRightLeft />
            Switch User
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <Link
            href={
              user_type === USERS.CLIENT
                ? `/c/${page_name}`
                : "/c/organizations"
            }
            key={organization.name}
          >
            <DropdownMenuItem className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <User />
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

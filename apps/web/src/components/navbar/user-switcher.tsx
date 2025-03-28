import * as React from "react";
import Link from "next/link";
import {
  ArrowRightLeft,
  Building,
  ExternalLink,
  RefreshCw,
} from "lucide-react";
import { sso_url } from "@no-auth/next";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import { getOrganizationsByRefV1 } from "@/trpc/routers/organizations";
import { useURL } from "@/hooks/use-url";
import { USERS } from "@/registry/sidebar";
import { NO_AUTH_USER_ROLES_ENUM } from "@/lib/trpc/schemas/v1/users";
import { Button } from "@workspace/ui/components/button";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { useUser } from "@/hooks/use-user";
import { useOrganization } from "@/hooks/use-organization";

export function NavbarUserSwitcher() {
  const { user_type, page_name } = useURL();
  const { user, isUserLoading, deleteUser, setUser } = useUser();
  const { org, isOrgLoading, deleteOrg, setOrg } = useOrganization();
  const { data, isLoading, isError } = getOrganizationsByRefV1({
    filter: {
      user: {
        uuid: user?.uuid,
      },
      organization: {},
    },
  });

  const Loading = () => {
    return (
      <Skeleton className="bg-sidebar-primary text-sidebar-primary-foreground size-8 rounded-lg" />
    );
  };

  const Reload = () => {
    return (
      <Button
        size="sm"
        className="rounded-lg bg-red-500 !text-white hover:bg-red-600"
        onClick={() => window.location.reload()}
      >
        <RefreshCw className="size-3" />
      </Button>
    );
  };

  if (isUserLoading || isOrgLoading || isLoading) return <Loading />;

  if (!user || !data || isError) return <Reload />;

  const User = () => {
    return <span className="w-8">{user.name.toUpperCase()[0]}</span>;
  };

  const Organization = () => {
    return (
      <>
        <Building className="size-3" />
      </>
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="sm"
          className="text-sidebar-primary-foreground bg-sidebar-primary hover:bg-sidebar-primary/80 rounded-lg p-0"
        >
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
        {data.length !== 0 ? (
          <>
            <DropdownMenuLabel className="text-muted-foreground text-xs">
              Organizations
            </DropdownMenuLabel>
            <DropdownMenuGroup>
              {data.map((organization, idx) => (
                <Link
                  href={
                    user_type === USERS.ORGANIZATION
                      ? `/o/${page_name}`
                      : "/o/dashboard"
                  }
                  key={idx}
                  onClick={() => {
                    deleteUser();
                    setOrg(organization.uuid);
                  }}
                >
                  <DropdownMenuItem>{organization.name}</DropdownMenuItem>
                </Link>
              ))}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
          </>
        ) : null}
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
          <Link
            href={sso_url}
            onClickCapture={() => {
              deleteUser();
              deleteOrg();
            }}
          >
            <DropdownMenuItem>
              <ArrowRightLeft />
              Switch User
            </DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
          <Link
            href={
              user_type === USERS.CLIENT
                ? `/c/${page_name}`
                : "/c/organizations"
            }
            onClick={() => {
              deleteOrg();
              setUser(user.uuid);
            }}
          >
            <DropdownMenuItem className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-9 items-center justify-center rounded-lg">
                  {user.name.toUpperCase()[0]}
                </div>
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

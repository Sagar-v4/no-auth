import * as React from "react";
import Link from "next/link";
import {
  ArrowRightLeft,
  Building,
  ChevronsUpDown,
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
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@workspace/ui/components/sidebar";
import { getOrganizationsByRefV1 } from "@/trpc/routers/organizations";
import { UserSwitcherSkeleton } from "@/skeletons/sidebar/user-switcher";
import { useURL } from "@/hooks/use-url";
import { Avatar, AvatarFallback } from "@workspace/ui/components/avatar";
import { USERS } from "@/registry/sidebar";
import { NO_AUTH_USER_ROLES_ENUM } from "@/lib/trpc/schemas/v1/users";
import { useUser } from "@/hooks/use-user";
import { useOrganization } from "@/hooks/use-organization";
import { getShortName } from "@/utils/short-name";

export function SidebarUserSwitcher() {
  const { isMobile } = useSidebar();
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

  const Reload = () => {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            size="lg"
            className="bg-red-500 !text-white hover:bg-red-600"
            onClick={() => window.location.reload()}
          >
            <div className="flex aspect-square size-8 items-center justify-center">
              <RefreshCw className="size-4" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              Reload
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  };

  if (isUserLoading || isOrgLoading || isLoading)
    return <UserSwitcherSkeleton />;

  if (!user || !data || isError) return <Reload />;

  const User = () => {
    return (
      <>
        <Avatar className="size-8 rounded-lg">
          <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground rounded-lg">
            {getShortName(user.name)}
          </AvatarFallback>
        </Avatar>
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-medium">{user.name}</span>
          <span className="truncate text-xs">{user.email}</span>
        </div>
      </>
    );
  };

  const Organization = () => {
    if (org)
      return (
        <>
          <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
            <Building className="size-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">{org.name}</span>
            <span className="truncate text-xs">{org.status}</span>
          </div>
        </>
      );
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground rounded-lg"
            >
              {user_type === USERS.CLIENT ? <User /> : null}
              {user_type === USERS.ORGANIZATION ? <Organization /> : null}
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
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
                        setOrg(organization.uuid);
                      }}
                    >
                      <DropdownMenuItem>
                        <Building />
                        <span className="max-w-50 truncate font-medium">
                          {organization.name}
                        </span>
                      </DropdownMenuItem>
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
                  setUser(user.uuid);
                }}
              >
                <DropdownMenuItem className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <User />
                  </div>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

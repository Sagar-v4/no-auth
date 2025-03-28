"use client";

import React from "react";
import { TABS } from "@/registry/sidebar";
import { TabsContent } from "@workspace/ui/components/tabs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Badge } from "@workspace/ui/components/badge";
import {
  Building,
  User,
  CalendarDays,
  Info,
  Calendar,
  Shield,
} from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@workspace/ui/components/hover-card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar";
import { useUser } from "@/hooks/use-user";
import { useOrganization } from "@/hooks/use-organization";
import { LoadingCircle } from "@/skeletons/loading";
import { StatusEnum } from "@/lib/trpc/schemas/v1/organizations";
import { getShortName } from "@/utils/short-name";
import { Separator } from "@workspace/ui/components/separator";
import { formatDate } from "@/utils/date";

export default function Page() {
  const { user } = useUser();
  const { org } = useOrganization();

  if (!user || !org) return <LoadingCircle />;

  const getStatusBadgeVariant = (status: StatusEnum) => {
    switch (status) {
      case "ACTIVE":
        return "default";
      case "ARCHIVED":
        return "secondary";
      case "DELETED":
        return "destructive";
    }
  };

  return (
    <>
      <TabsContent value={TABS.PROFILE.value} asChild>
        <div className="container mx-auto p-2">
          <Card>
            <CardHeader className="border-b pb-4">
              <div className="flex items-center space-x-4">
                <div className="bg-primary/10 rounded-lg p-3">
                  <Building className="text-primary size-8" />
                </div>
                <div>
                  <CardTitle className="max-w-56 truncate text-2xl md:max-w-80 lg:max-w-96">
                    {org.name}
                  </CardTitle>
                  <p className="text-muted-foreground text-sm">
                    Organization Profile
                  </p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-10">
              <div className="flex flex-col justify-center gap-4 lg:flex-row">
                <div className="w-full space-y-8">
                  <div className="flex items-center space-x-2">
                    <Info className="text-muted-foreground size-6" />
                    <div>
                      <p className="text-sm font-medium">Description</p>
                      <p className="text-muted-foreground mt-1 text-sm">
                        {org.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Shield className="text-muted-foreground size-6" />
                    <div>
                      <p className="text-sm font-medium">Status</p>
                      <Badge variant={getStatusBadgeVariant(org.status)}>
                        {org.status}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Calendar className="text-muted-foreground size-6" />
                    <div>
                      <p className="text-sm font-medium">Created At</p>
                      <p className="text-muted-foreground text-sm">
                        {formatDate(org.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>

                <Separator className="hidden lg:block lg:!h-auto lg:!w-px" />

                <div className="flex w-full flex-col space-y-8">
                  <div className="flex items-center space-x-2">
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <div className="mt-1 flex cursor-pointer items-center space-x-2">
                          <Avatar className="size-12">
                            <AvatarFallback>
                              {getShortName(user.name)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="hover:underline">
                            <p>{user.name}</p>
                            <p className="text-xs font-medium">
                              Organization Owner
                            </p>
                          </span>
                        </div>
                      </HoverCardTrigger>
                      <HoverCardContent>
                        <div className="flex space-x-4">
                          <Avatar>
                            <AvatarFallback>
                              {getShortName(user.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="space-y-1">
                            <h4 className="text-sm font-semibold">
                              {user.name}
                            </h4>
                            <p className="text-muted-foreground text-xs">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  </div>

                  <div className="mt-auto space-y-2 pt-2">
                    <Button variant="secondary" className="w-full">
                      Edit Organization
                    </Button>
                    <Button variant="outline" className="w-full">
                      Manage Members
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </>
  );
}

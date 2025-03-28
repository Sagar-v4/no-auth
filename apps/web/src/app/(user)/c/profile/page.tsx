"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Badge } from "@workspace/ui/components/badge";
import { Avatar, AvatarFallback } from "@workspace/ui/components/avatar";
import { Button } from "@workspace/ui/components/button";
import { TABS } from "@/registry/sidebar";
import { TabsContent } from "@workspace/ui/components/tabs";
import { useUser } from "@no-auth/next";
import { StatusEnum } from "@/lib/trpc/schemas/v1/users";
import { Calendar, KeyRound, Link, Shield, User } from "lucide-react";
import { LoadingCircle } from "@/skeletons/loading";
import { getShortName } from "@/utils/short-name";
import { ChangeLoginMethod } from "@/components/sso/login-methods";
import { Separator } from "@workspace/ui/components/separator";
import { formatDate } from "@/utils/date";

export default function Page() {
  const { user } = useUser();

  if (!user) return <LoadingCircle />;

  const getStatusBadgeVariant = (status: StatusEnum) => {
    switch (status) {
      case "ACTIVE":
        return "default";
      case "BLOCKED":
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
            <CardHeader className="flex flex-row items-center space-x-4 border-b pb-4">
              <Avatar className="bg-primary/10 size-16">
                <AvatarFallback className="text-primary">
                  {getShortName(user.name)}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl">{user.name}</CardTitle>
                <p className="text-muted-foreground">{user.email}</p>
              </div>
            </CardHeader>

            <CardContent className="space-y-10">
              <div className="flex flex-col justify-center gap-4 lg:flex-row">
                <div className="w-full space-y-8">
                  <div className="flex items-center space-x-2">
                    <User className="text-muted-foreground size-6" />
                    <div>
                      <p className="text-sm font-medium">Roles</p>
                      <div className="mt-1 flex space-x-2">
                        {user.roles.map((role) => (
                          <Badge key={role} variant="secondary">
                            {role}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Shield className="text-muted-foreground size-6" />
                    <div>
                      <p className="text-sm font-medium">Status</p>
                      <Badge variant={getStatusBadgeVariant(user.status)}>
                        {user.status}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Calendar className="text-muted-foreground size-6" />
                    <div>
                      <p className="text-sm font-medium">Created At</p>
                      <p className="text-muted-foreground text-sm">
                        {formatDate(user.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>

                <Separator className="hidden lg:block lg:!h-auto lg:!w-px" />

                <div className="flex w-full flex-col space-y-8">
                  <div className="flex items-center space-x-2">
                    {user.login_method === "OTP" ? (
                      <KeyRound className="text-muted-foreground size-6" />
                    ) : null}
                    {user.login_method === "MAGIC_LINK" ? (
                      <Link className="text-muted-foreground size-6" />
                    ) : null}
                    <div>
                      <p className="text-sm font-medium">Login Method</p>
                      <Badge variant="outline" className="mt-1">
                        {user.login_method.replaceAll("_", " ")}
                      </Badge>
                    </div>
                  </div>

                  <div className="mt-auto space-y-2 pt-2">
                    <Button variant="secondary" className="w-full">
                      Edit Profile
                    </Button>
                    <ChangeLoginMethod
                      uuid={user.uuid}
                      target="USER"
                      curr_method={user.login_method}
                    />
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

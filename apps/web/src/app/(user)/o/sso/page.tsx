"use client";

import React, { useState } from "react";
import { Create } from "@/components/sso/create";
import { Edit } from "@/components/sso/edit";
import { useOrganization } from "@/hooks/use-organization";
import { TABS } from "@/registry/sidebar";
import { LoadingCircle } from "@/skeletons/loading";
import { getSSOByDataV1 } from "@/trpc/routers/sso";
import { TabsContent } from "@workspace/ui/components/tabs";
import { cn } from "@workspace/ui/lib/utils";
import { Cloud, FileKey, KeyRound, RefreshCw, Shield } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Badge } from "@workspace/ui/components/badge";
import { Link2, Copy, Eye, EyeOff, RefreshCcw, Calendar } from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { StatusEnum } from "@/lib/trpc/schemas/v1/sso";
import { Separator } from "@workspace/ui/components/separator";
import { formatDate } from "@/utils/date";

export default function Page() {
  const { org } = useOrganization();

  // State for secret key visibility and copied state
  const [isSecretVisible, setIsSecretVisible] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const { data, isLoading, refetch, isRefetching } = getSSOByDataV1({
    filter: [
      {
        organization_id: org?._id,
      },
    ],
  });

  const Contex = ({ task }: { task: "LOADING" | "CREATE" }) => {
    return (
      <div className="flex h-96 items-center justify-center">
        {task === "LOADING" ? <LoadingCircle /> : null}
        {task === "CREATE" ? <Create /> : null}
      </div>
    );
  };

  const Refresh = () => {
    return (
      <div className="flex h-96 items-center justify-center">
        <Button variant="default" size="sm" onClick={() => refetch()}>
          <RefreshCw className={cn(isRefetching && "animate-spin")} /> Refresh
        </Button>
      </div>
    );
  };

  if (isLoading) return <Contex task="LOADING" />;
  if (!data) return <Refresh />;
  if (data.length === 0) return <Contex task="CREATE" />;

  // Copy secret key to clipboard
  const handleCopySecret = () => {
    navigator.clipboard.writeText(data?.at(0)?.secret as string);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Toggle secret key visibility
  const toggleSecretVisibility = () => {
    setIsSecretVisible(!isSecretVisible);
  };

  const getStatusBadgeVariant = (status: StatusEnum) => {
    switch (status) {
      case "PREACTIVE":
        return "secondary";
      case "ACTIVE":
        return "default";
      case "DEACTIVATED":
        return "destructive";
      case "DELETED":
        return "destructive";
    }
  };

  return (
    <>
      <TabsContent value={TABS.SSO.value} asChild>
        <div className="mx-auto p-2">
          <Card>
            <CardHeader className="border-b pb-4">
              <div className="flex items-center space-x-4">
                <div className="bg-primary/10 rounded-lg p-3">
                  <Cloud className="text-primary h-8 w-8" />
                </div>
                <div>
                  <CardTitle className="text-2xl">
                    Single Sign On Configuration
                  </CardTitle>
                  <p className="text-muted-foreground text-sm">
                    SSO Integration Details
                  </p>
                </div>
                <div className="bg-primary/10 ml-auto rounded-lg">
                  <Edit uuid={data?.at(0)?.uuid} />
                </div>
              </div>
            </CardHeader>

            <CardContent className="mt-4 space-y-4">
              <div className="flex flex-col justify-between gap-4 lg:flex-row">
                <div className="w-full space-y-8">
                  <div className="flex items-center space-x-2">
                    <Link2 className="text-muted-foreground h-5 w-5" />
                    <div className="w-full">
                      <p className="text-sm font-medium">Redirect URL</p>
                      <div className="mt-1 flex items-center space-x-2">
                        <Input
                          value={data?.at(0)?.redirect_url}
                          readOnly
                          className="flex-grow"
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            navigator.clipboard.writeText(
                              data?.at(0)?.redirect_url as string,
                            )
                          }
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Link2 className="text-muted-foreground h-5 w-5" />
                    <div className="w-full">
                      <p className="text-sm font-medium">Webhook URL</p>
                      <div className="mt-1 flex items-center space-x-2">
                        <Input
                          value={data?.at(0)?.webhook_url}
                          readOnly
                          className="flex-grow"
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            navigator.clipboard.writeText(
                              data?.at(0)?.webhook_url as string,
                            )
                          }
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <FileKey className="text-muted-foreground h-5 w-5" />
                    <div className="w-full">
                      <p className="text-sm font-medium">Secret Key</p>
                      <div className="mt-1 flex items-center space-x-2">
                        <Input
                          type={isSecretVisible ? "text" : "password"}
                          value={data?.at(0)?.secret}
                          readOnly
                          className="flex-grow"
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={toggleSecretVisibility}
                        >
                          {isSecretVisible ? (
                            <EyeOff className="size-4" />
                          ) : (
                            <Eye className="size-4" />
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={handleCopySecret}
                        >
                          {isCopied ? "✓" : <Copy className="size-4" />}
                        </Button>
                        <Button variant="outline" size="icon">
                          <RefreshCcw className="size-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator className="hidden lg:block lg:!h-auto lg:!w-px" />

                {/* Additional Details and Owner */}
                <div className="w-full space-y-14">
                  <div className="flex items-center space-x-2">
                    <Shield className="text-muted-foreground h-5 w-5" />
                    <div>
                      <p className="text-sm font-medium">Status</p>
                      <Badge
                        variant={getStatusBadgeVariant(
                          data?.at(0)?.status as StatusEnum,
                        )}
                      >
                        {data?.at(0)?.status}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <KeyRound className="text-muted-foreground h-5 w-5" />
                    <div>
                      <p className="text-sm font-medium">Login Method</p>
                      <Badge variant="secondary" className="mt-1">
                        {data?.at(0)?.login_method}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Calendar className="text-muted-foreground h-5 w-5" />
                    <div>
                      <p className="text-sm font-medium">Created At</p>
                      <p className="text-muted-foreground text-sm">
                        {formatDate(data?.at(0)?.createdAt)}
                      </p>
                    </div>
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

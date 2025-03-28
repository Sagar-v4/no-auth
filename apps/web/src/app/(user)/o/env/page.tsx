"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Button } from "@workspace/ui/components/button";
import { Code, Copy, Check, Server, Laptop, RefreshCw } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs";
import { Badge } from "@workspace/ui/components/badge";
import { Input } from "@workspace/ui/components/input";
import { TABS } from "@/registry/sidebar";
import { LoadingCircle } from "@/skeletons/loading";
import { getSSOByDataV1 } from "@/trpc/routers/sso";
import { useOrganization } from "@/hooks/use-organization";
import { cn } from "@workspace/ui/lib/utils";
import { env } from "@/env/client/env.schema";

export default function Page() {
  const { org } = useOrganization();

  // State to track copied status
  const [copiedItem, setCopiedItem] = useState({ type: "", key: "" });

  const { data, isLoading, refetch, isRefetching } = getSSOByDataV1({
    filter: [
      {
        organization_id: org?._id,
      },
    ],
  });

  const Loading = () => {
    return (
      <div className="flex h-96 items-center justify-center">
        <LoadingCircle />
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

  if (isLoading) return <Loading />;
  if (!data) return <Refresh />;

  const frontendEnv = [
    {
      key: "NEXT_PUBLIC_NO_AUTH_SSO_URL",
      value: `${window.location.origin}/sso/v1/${data?.at(0)?.uuid}`,
      sensitive: false,
    },
    {
      key: "NEXT_PUBLIC_NO_AUTH_SERVER_URL",
      value: env.APP_BASE_URL,
      sensitive: false,
    },
  ];

  const backendEnv = [
    {
      key: "NO_AUTH_SSO_SECRET",
      value: data?.at(0)?.secret,
      sensitive: true,
    },
  ];

  // Function to copy env variable
  const copyEnvVariable = (type: any, item: { key: any; value: any }) => {
    navigator.clipboard.writeText(`${item.key}=${item.value}`);
    setCopiedItem({ type, key: item.key });
    setTimeout(() => setCopiedItem({ type: "", key: "" }), 2000);
  };

  // Function to copy entire env file content
  const copyEntireEnvFile = (type: string, envList: any[]) => {
    const envContent = envList
      .map((item) => `${item.key}=${item.value}`)
      .join("\n");

    navigator.clipboard.writeText(envContent);
    setCopiedItem({ type: `${type}_full`, key: "full" });
    setTimeout(() => setCopiedItem({ type: "", key: "" }), 2000);
  };

  // Render env variable row
  const renderEnvVariable = (
    type: string,
    item: { key: any; value: any; sensitive?: any },
  ) => (
    <div
      key={item.key}
      className="flex items-center justify-between border-b py-2 last:border-b-0"
    >
      <div className="flex items-center space-x-2">
        <Badge variant={item.sensitive ? "destructive" : "secondary"}>
          {item.sensitive ? "Sensitive" : "Non-Sensitive"}
        </Badge>
        <span className="font-mono text-sm">{item.key}</span>
      </div>
      <div className="flex items-center space-x-2">
        <Input
          value={item.value}
          readOnly
          type={item.sensitive ? "password" : "text"}
          className="w-64 font-mono"
        />
        <Button
          variant="outline"
          size="icon"
          onClick={() => copyEnvVariable(type, item)}
        >
          {copiedItem.type === type && copiedItem.key === item.key ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
  return (
    <>
      <TabsContent value={TABS.ENV.value} asChild>
        <div className="container mx-auto p-2">
          <Card>
            <CardHeader className="border-b pb-4">
              <div className="flex items-center space-x-4">
                <div className="bg-primary/10 rounded-lg p-3">
                  <Code className="text-primary h-8 w-8" />
                </div>
                <div>
                  <CardTitle className="text-2xl">
                    Environment Configuration
                  </CardTitle>
                  <p className="text-muted-foreground text-sm">
                    Manage and copy environment variables
                  </p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="mt-4">
              <Tabs defaultValue="frontend" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger
                    value="frontend"
                    className="flex items-center space-x-2"
                  >
                    <Laptop className="h-4 w-4" />
                    <span>Frontend</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="backend"
                    className="flex items-center space-x-2"
                  >
                    <Server className="h-4 w-4" />
                    <span>Backend</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="frontend" className="mt-4">
                  <div className="space-y-4">
                    <div className="mb-2 flex justify-end">
                      <Button
                        variant="secondary"
                        onClick={() =>
                          copyEntireEnvFile("frontend", frontendEnv)
                        }
                      >
                        {copiedItem.type === "frontend_full" ? (
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="mr-2 h-4 w-4" />
                        )}
                        Copy .env File
                      </Button>
                    </div>
                    {frontendEnv.map((item) =>
                      renderEnvVariable("frontend", item),
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="backend" className="mt-4">
                  <div className="space-y-4">
                    <div className="mb-2 flex justify-end">
                      <Button
                        variant="secondary"
                        onClick={() => copyEntireEnvFile("backend", backendEnv)}
                      >
                        {copiedItem.type === "backend_full" ? (
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="mr-2 h-4 w-4" />
                        )}
                        Copy .env File
                      </Button>
                    </div>
                    {backendEnv.map((item) =>
                      renderEnvVariable("backend", item),
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </>
  );
}

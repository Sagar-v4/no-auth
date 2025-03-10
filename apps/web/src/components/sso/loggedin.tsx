"use client";

import * as React from "react";
import { Check } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar";
import { cn } from "@workspace/ui/lib/utils";
import { Card, CardContent } from "@workspace/ui/components/card";

export function SSOLoggedIn() {
  const data = {
    email: "test@email.com",
    image_url: "shadcn.jpg",
  };

  const User = () => {
    return (
      <div className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm">
        <Avatar className="h-8 w-8 rounded-lg">
          <AvatarImage src={data.image_url} />
          <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground rounded-lg">
            {data.email.toUpperCase()[0]}
          </AvatarFallback>
        </Avatar>
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-medium">{data.email}</span>
          <span className="truncate text-xs">test name</span>
        </div>
      </div>
    );
  };

  const users: number[] = Array.of(1, 2);

  return (
    <>
      <div className="mb-6 flex flex-col items-center text-center">
        <h1 className="text-2xl font-bold">Loggedin accounts</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Select email from below to login to that account
        </p>
      </div>
      <Card className="hidden overflow-scroll p-0 lg:block lg:h-60">
        <CardContent className="p-2">
          {users.length !== 0 ? (
            users.map((user) => (
              <span
                key={user}
                className={cn(
                  user == 2
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "hover:bg-accent",
                  "relative flex rounded-md",
                )}
              >
                <User />
                {user == 2 && (
                  <Check className="absolute right-0 mx-2 my-4 size-4" />
                )}
              </span>
            ))
          ) : (
            <div className="flex h-40 items-center justify-center">
              No loggedin accounts
            </div>
          )}
        </CardContent>
      </Card>
      <div className="lg:hidden">
        <Select defaultValue="2">
          <SelectTrigger className="h-14">
            <SelectValue placeholder="Select loggedin account" />
          </SelectTrigger>
          <SelectContent className="h-83">
            <SelectGroup>
              {users.length !== 0 ? (
                users.map((user) => (
                  <SelectItem key={user} value={String(user)}>
                    <User />
                  </SelectItem>
                ))
              ) : (
                <div className="flex h-76 items-center justify-center">
                  No loggedin accounts
                </div>
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </>
  );
}

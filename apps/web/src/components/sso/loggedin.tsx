"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import { Card, CardContent } from "@workspace/ui/components/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar";

export function SSOLoggedIn() {
  const data = {
    email: "sagarvariya4@gmai.com",
    image_url: "",
  };

  const User = () => {
    return (
      <div className="hover:bg-accent flex items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm">
        <Avatar className="h-8 w-8 rounded-lg">
          <AvatarImage src={data.image_url} />
          <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground rounded-lg">
            {data.email.toUpperCase()[0]}
          </AvatarFallback>
        </Avatar>
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-medium">{data.email}</span>
          <span className="truncate text-xs">vcds</span>
        </div>
      </div>
    );
  };

  const users: number[] = Array.of(1, 2, 3, 4, 5, 6, 7, 8);

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
            users.map((user) => <User key={user} />)
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

"use client";

import {
  getCookie,
  hasCookie,
  setCookie,
  deleteCookie,
  OptionsType,
} from "cookies-next";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { sso_url, useUser as useNoAuthUser } from "@no-auth/next";

export function useUser() {
  const user_key = "_USR";
  const router = useRouter();
  const pathname = usePathname();
  const options: OptionsType = {
    path: "/",
    secure: true,
    sameSite: true,
    priority: "high",
  };
  const exists = hasCookie(user_key, options);

  const [user_uuid, setUuid] = React.useState(
    getCookie(user_key, options)?.toString(),
  );

  const setUser = (uuid: string) => {
    setUuid(uuid);
    setCookie(user_key, uuid, options);
  };

  const deleteUser = () => {
    setUuid(undefined);
    deleteCookie(user_key, options);
  };

  const { user, isUserLoading } = useNoAuthUser();

  React.useEffect(() => {
    if (user_uuid) setUser(user_uuid);
    else if (user) setUser(user.uuid);
    else if (pathname.includes("/c/")) {
      deleteUser();
      router.push(sso_url.toString());
    }
  }, [user_uuid, user]);

  return { user, exists, isUserLoading, setUser, deleteUser };
}

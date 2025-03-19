"use client";

import { useLocalStorage } from "usehooks-ts";

export function useCurrentUser() {
  const USER_KEY = "user";
  const ACTIVE_ORGANIZATION_KEY = "organization";

  const [localUser, setLocalUser, removeLocalUser] = useLocalStorage(
    USER_KEY,
    "",
  );
  const [
    localActiveOrganization,
    setLocalActiveOrganization,
    removeLocalActiveOrganization,
  ] = useLocalStorage(ACTIVE_ORGANIZATION_KEY, "");

  const user = {
    _id: "67d9f47276052dc2a414cdc3",
    name: "sagarvariya4",
    email: "sagarvariya4@gmail.com",
    login_method: "OTP",
    status: "ACTIVE",
    roles: ["CLIENT", "ADMIN"],
    uuid: "94c951ba-4929-4c0f-89c7-52cff3485baf",
    createdAt: "2025-03-18T22:32:18.059Z",
    updatedAt: "2025-03-18T22:32:18.059Z",
    __v: 0,
  };

  const organization = {
    _id: "67d9f47276052dc2a414cdd0",
    user_id: "67d9f47276052dc2a414cdc3",
    name: "No Auth",
    description: "This is No Auth Organization",
    status: "ACTIVE",
    uuid: "b73e35eb-a6c6-4965-a56f-7262a21a019e",
    createdAt: "2025-03-18T22:32:18.160Z",
    updatedAt: "2025-03-18T22:32:18.160Z",
    __v: 0,
  };

  return {
    user,
    organization,
    USER_KEY,
    ACTIVE_ORGANIZATION_KEY,
    localUser,
    setLocalUser,
    removeLocalUser,
    localActiveOrganization,
    setLocalActiveOrganization,
    removeLocalActiveOrganization,
  };
}

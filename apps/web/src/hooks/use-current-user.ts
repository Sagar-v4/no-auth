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
    _id: "67e44642ec52e2cdbd5652fa",
    name: "sagarvariya4",
    email: "sagarvariya4@gmail.com",
    login_method: "OTP",
    status: "ACTIVE",
    roles: ["CLIENT", "ADMIN"],
    uuid: "8a1abe95-c608-4afe-a97d-680ab4dc534c",
    createdAt: "2025-03-18T22:32:18.059Z",
    updatedAt: "2025-03-18T22:32:18.059Z",
    __v: 0,
  };

  const organization = {
    _id: "67e44642ec52e2cdbd565308",
    user_id: "67e44642ec52e2cdbd5652fa",
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

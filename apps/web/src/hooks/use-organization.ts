import {
  getCookie,
  hasCookie,
  setCookie,
  deleteCookie,
  OptionsType,
} from "cookies-next";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { getOrganizationByIdV1 } from "@/trpc/routers/organizations";

export function useOrganization() {
  const org_key = "_ORG";
  const router = useRouter();
  const pathname = usePathname();
  const options: OptionsType = {
    path: "/",
    secure: true,
    sameSite: true,
    priority: "high",
  };
  const exists = hasCookie(org_key, options);

  const [org_uuid, setUuid] = React.useState(
    getCookie(org_key, options)?.toString(),
  );

  const setOrg = (uuid: string) => {
    setUuid(uuid);
    setCookie(org_key, uuid, options);
  };

  const deleteOrg = () => {
    setUuid(undefined);
    deleteCookie(org_key, options);
  };

  const {
    data: org,
    isError,
    isLoading: isOrgLoading,
    exec,
  } = getOrganizationByIdV1({
    filter: {
      uuid: org_uuid,
    },
  });

  React.useEffect(() => {
    if (org_uuid && !org) exec();
    else if (org) setOrg(org.uuid);
    else if (org_uuid) setOrg(org_uuid);
    else if (isError || pathname.includes("/o/")) {
      deleteOrg();
      router.push("/c/organizations");
    }
  }, [org_uuid]);

  return { org, exists, isOrgLoading, setOrg, deleteOrg };
}

"use client";

import { getCookie, setCookie } from "cookies-next/client";
import { createOneDevice } from "@/trpc/routers/devices";
import { useEffect } from "react";

export function DeviceProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data, exec } = createOneDevice();
  const device_uuid = getCookie("device_uuid");

  useEffect(() => {
    if (!device_uuid && !data) {
      exec({ doc: {} });
    }
    if (!device_uuid && data) {
      setCookie("device_uuid", data.uuid);
    }
  }, [data, device_uuid]);

  return children;
}

"use client";

import { createOneDevice } from "@/trpc/routers/devices";
import { useEffect } from "react";
import { useDevice } from "@/hooks/use-device";

export function DeviceProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data, exec } = createOneDevice();
  const { device_uuid, set_device_uuid } = useDevice();

  useEffect(() => {
    if (device_uuid) return;

    if (!data) {
      exec({ doc: {} });
    } else {
      set_device_uuid(data.uuid);
    }
  }, [data, device_uuid]);

  return children;
}

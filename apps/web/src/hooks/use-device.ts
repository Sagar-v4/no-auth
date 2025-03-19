"use client";

import { useEffect } from "react";
import { getDeviceById } from "@/trpc/routers/devices";
import { getCookie, setCookie } from "cookies-next/client";

export function useDevice() {
  const KEY = "device_uuid";
  const device_uuid = getCookie(KEY);

  const { data: device_data, exec } = getDeviceById({
    filter: {
      uuid: String(device_uuid),
    },
  });

  const set_device_uuid = (uuid: string) => {
    setCookie(KEY, uuid);
  };

  useEffect(() => {
    exec();
  }, [device_uuid]);

  return { KEY, device_data, device_uuid, set_device_uuid };
}

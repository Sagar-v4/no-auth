"use client";

import { useDevice } from "@/swr/hooks/devices";

export function DeviceProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data } = useDevice();

  return children;
}

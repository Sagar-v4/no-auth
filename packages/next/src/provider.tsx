import React from "react";
import { SWRConfig } from "swr";

export async function NoAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SWRConfig
      value={{
        errorRetryCount: 2,
        keepPreviousData: true,
        revalidateOnFocus: true,
        refreshWhenOffline: false,
        refreshInterval: 1000 * 60, // 1 min
        errorRetryInterval: 1000 * 3, // 3 sec
      }}
    >
      {children}
    </SWRConfig>
  );
}

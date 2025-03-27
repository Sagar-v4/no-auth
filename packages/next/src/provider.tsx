"use server";

import React from "react";
import { SWRConfig } from "swr";

export function NoAuthProvider({ children }: { children: React.ReactNode }) {
  return <SWRConfig>{children}</SWRConfig>;
}

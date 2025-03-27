import { SWRConfig } from "swr";

export function SWRProvider({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig
      value={
        {
          // fetcher: fetcher,
        }
      }
    >
      {children}
    </SWRConfig>
  );
}

import { DeviceProvider } from "@/components/device/provider";

export default async function SSOLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DeviceProvider>{children}</DeviceProvider>;
}

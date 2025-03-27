import { DeviceProvider } from "@/components/device/provider";
import { SWRProvider } from "@/swr/provider";
import { ModeSwitcher } from "@workspace/ui/components/mode-switcher";

export default async function SSOLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SWRProvider>
      <DeviceProvider>
        <div className="bg-accent flex min-h-screen flex-col items-center justify-center p-6 lg:p-10">
          <ModeSwitcher
            size="icon"
            variant="default"
            className="bg-accent hover:text-accent text-accent-foreground absolute top-4 right-4 rounded-full shadow-none"
          />
          {children}
        </div>
      </DeviceProvider>
    </SWRProvider>
  );
}

import { TABS } from "@/registry/sidebar";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@workspace/ui/components/card";
import { TabsContent } from "@workspace/ui/components/tabs";

export default function Page() {
  return (
    <>
      <TabsContent value={TABS.USER.value} asChild>
        <Card>
          <CardHeader>
            <CardTitle>{TABS.USER.title}</CardTitle>
            <CardDescription>Find user sessions by user uuid.</CardDescription>
          </CardHeader>
        </Card>
      </TabsContent>

      <TabsContent value={TABS.DEVICE.value} asChild>
        <Card>
          <CardHeader>
            <CardTitle>{TABS.DEVICE.title}</CardTitle>
            <CardDescription>
              Find user sessions by device uuid.
            </CardDescription>
          </CardHeader>
        </Card>
      </TabsContent>
    </>
  );
}

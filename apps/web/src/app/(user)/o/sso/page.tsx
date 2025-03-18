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
      <TabsContent value={TABS.SSO.value} asChild>
        <Card>
          <CardHeader>
            <CardTitle>{TABS.SSO.title}</CardTitle>
            <CardDescription>Find user sessions by user uuid.</CardDescription>
          </CardHeader>
        </Card>
      </TabsContent>
    </>
  );
}

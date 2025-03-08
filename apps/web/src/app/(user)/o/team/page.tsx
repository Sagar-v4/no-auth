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
      <TabsContent value={TABS.MEMBER.value} asChild>
        <Card>
          <CardHeader>
            <CardTitle>{TABS.MEMBER.title}</CardTitle>
            <CardDescription>Organization members.</CardDescription>
          </CardHeader>
        </Card>
      </TabsContent>

      <TabsContent value={TABS.PERMISSION.value} asChild>
        <Card>
          <CardHeader>
            <CardTitle>{TABS.PERMISSION.title}</CardTitle>
            <CardDescription>
              Organization members permission states what member has access.
            </CardDescription>
          </CardHeader>
        </Card>
      </TabsContent>
    </>
  );
}

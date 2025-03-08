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
      <TabsContent value={TABS.SETTING.value} asChild>
        <Card>
          <CardHeader>
            <CardTitle>{TABS.SETTING.title}</CardTitle>
            <CardDescription>
              Organization settings like owner, status etc.
            </CardDescription>
          </CardHeader>
        </Card>
      </TabsContent>
    </>
  );
}

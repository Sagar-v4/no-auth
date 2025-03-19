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
      <TabsContent value={TABS.PERMISSION.value} asChild>
        <Card>
          <CardHeader>
            <CardTitle>{TABS.PERMISSION.title}</CardTitle>
            <CardDescription>
              Create permission for organization users and combine with role.
            </CardDescription>
          </CardHeader>
        </Card>
      </TabsContent>
    </>
  );
}
